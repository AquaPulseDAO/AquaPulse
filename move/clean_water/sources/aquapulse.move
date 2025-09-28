module aqua_pulse::CleanWater{

    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use std::string::String;
    use sui::bcs::{ Self, BCS };

    const E_NO_SUFFICIENT_SUI: u64 = 0;
    const E_ADDRESS_STORAGE_HIT_MAX: u64 = 0;
    const E_BLOB_DATA_STORAGE_HIT_MAX: u64 = 1;
    const E_ALREADY_SUBMITTED_TO_DATA: u64 = 2;
    const E_NO_ACCESS_TO_DATA: u64 = 0;

    
    public struct PublicStorage has key {
        id: UID,
        storage: vector<DataContainerMetadata>
    }

    public struct DataContainerMetadata has store, drop {
        container_addr: address,
        title: String,
        reward: u64,
        slot: u64,
    }

    public struct OwnerCap has key, store {
        id: UID,
        container_id: ID,
        owner: address
    }
// extra: only allow users who bought the device
    public struct DataContainer has key, store {
        id: UID,
        coins: Coin<SUI>,
        title: String,
        amount: u64,
        addresses: vector<address>,
        finished: bool,
        blobIds: vector<String>,
        max: u32,
    }

    //<SUI>
    fun init(ctx: &mut TxContext) {
        // create the data storage
        let data_storage = PublicStorage {
            id: object::new(ctx),
            storage: vector::empty<DataContainerMetadata>()
        };
        // make it existing on sui blockchian
        transfer::share_object(data_storage);
    }

    entry fun create_vault(storage: &mut PublicStorage, title: String, amount: u64, coin: Coin<SUI>, max: u32, ctx: &mut TxContext) {
        // check whether the user has sufficient amount of coin to invest
        assert!(amount == coin.balance().value(), E_NO_SUFFICIENT_SUI);

        let id = object::new(ctx);
        let conta_addr = object::uid_to_address(&id);
        let owner_cap = OwnerCap {
            id: object::new(ctx),
            container_id: object::uid_to_inner(&id),
            owner: ctx.sender()
        };
        let container_metadata = DataContainerMetadata {
            container_addr: conta_addr,
            title,
            reward: (amount / (max as u64)),
            slot: max as u64 //change to the state
        };
        
        let container = DataContainer {
            id,
            coins: coin,
            title, 
            amount,
            finished: false,
            addresses: vector::empty<address>(),
            blobIds: vector::empty<String>(),
            max, 
        };


        vector::push_back( &mut storage.storage, container_metadata);
        transfer::public_share_object(container);
        transfer::transfer(owner_cap, ctx.sender());
    }

    entry fun submit_data(vault: &mut DataContainer, data: String, ctx: &mut TxContext) {
        assert!(vector::length(&vault.blobIds) < (vault.max as u64), E_BLOB_DATA_STORAGE_HIT_MAX);
        assert!(vector::length(&vault.addresses) < (vault.max as u64), E_ADDRESS_STORAGE_HIT_MAX);
        assert!(vector::contains(&vault.addresses, &ctx.sender()), E_ALREADY_SUBMITTED_TO_DATA);
        //let id = object::id(string);  
        vector::push_back(&mut vault.blobIds, data);
        
        let sender = tx_context::sender(ctx);
        vector::push_back(&mut vault.addresses, sender);
        // you will give coin/max to ctx.sender
        let reward: u64 = vault.amount / (vault.max as u64);
        let coin_to_send = coin::split(&mut vault.coins, reward as u64, ctx);
        vector::push_back<address>(&mut vault.addresses, ctx.sender());
        vector::push_back<String>(&mut vault.blobIds, data);
        if (vector::length(&vault.addresses) == vault.max as u64){
            vault.finished = true
        };
        transfer::public_transfer(coin_to_send, ctx.sender());
    }

    entry fun seal_approval(id: vector<u8>, owner_cap: &OwnerCap, ctx: &mut TxContext) {
        assert!(owner_cap.owner == ctx.sender(), E_NO_ACCESS_TO_DATA);
    }
}
