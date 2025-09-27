"use client";

import "@mysten/dapp-kit/dist/index.css";
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
  useSuiClientContext
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';
import { useEffect, useState } from "react";

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  devnet:  { url: getFullnodeUrl("devnet")  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  // Crée un QueryClient une seule fois côté client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <RegisterEnokiWallets />
        <WalletProvider autoConnect>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}


function RegisterEnokiWallets() {
	const { client, network } = useSuiClientContext();
 
	useEffect(() => {
		if (!isEnokiNetwork(network)) return;
 
		const { unregister } = registerEnokiWallets({
			apiKey: 'enoki_public_e2cc5af0aafbf9dda310c8e25a6d7d08',
			providers: {
				// Provide the client IDs for each of the auth providers you want to use:
				google: {
					clientId: '947156781677-k2sihpm5ecjr1a0a23619q1iqupssl57.apps.googleusercontent.com',
				},
				facebook: {
					clientId: 'YOUR_FACEBOOK_CLIENT_ID',
				},
				twitch: {
					clientId: 'YOUR_TWITCH_CLIENT_ID',
				},
			},
			client,
			network,
		});
 
		return unregister;
	}, [client, network]);
 
	return null;
}