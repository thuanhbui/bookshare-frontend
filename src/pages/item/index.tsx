import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";

const ItemPage = (props) => {
	const router = useRouter();
	const [param, setParam] = useState({ itemId: null });

	useEffect(() => {
		router.query && setParam({
			itemId: router.query.itemId
		});
	}, [router.isReady])

	return (
		<React.Fragment>
			<Header />
			{/* <EpisodeTemplate seriesId={param.seriesId} episodeId={param.episodeId} /> */}
			{/* <Footer /> */}
		</React.Fragment>
	);
};

export default ItemPage;