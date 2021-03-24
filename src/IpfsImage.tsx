import { h, JSX } from "preact";

export interface IpfsImageProps {
	hash: string;
	preview?: boolean;
}

export default function IpfsImage({
	hash,
	preview,
}: IpfsImageProps): JSX.Element {
	const root = "https://wax.atomichub.io";
	const src = preview ? `${root}/preview?ipfs=${hash}` : `${root}/ipfs/${hash}`;

	return <img src={src} alt="" />;
}
