import axios from 'axios';
import Head from 'next/head';

import CurrencyComponent from '../../components/page components/CurrencyComponent.jsx';

const CurrencyPage = ({ res, sevenDres }) => {
   return (
      <>
         <Head>
            <title>| CryptoWatch</title>
         </Head>

         <CurrencyComponent res={res} sevenDres={sevenDres} />
      </>
   );
};

export async function getStaticPaths() {
   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1`;

   const res = await (await axios(url)).data;

   const paths = res.map((coin) => ({
      params: { id: coin.id },
   }));

   return {
      paths,
      fallback: true,
   };
}

export async function getStaticProps({ params }) {
   // const url = `https://api.coingecko.com/api/v3/coins/${params.id}`;

   const url = `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
   const sevenDUrl = `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=7`;

   const res = await (await axios(url)).data;
   const sevenDres = await (await axios(sevenDUrl)).data;

   return { props: { res, sevenDres } };
}

function srtipData(coin) {
   return {
      id: coin.id,
   };
}

export default CurrencyPage;
