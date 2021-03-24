import { h, JSX } from "preact";

export interface IpfsImageProps {
	hash: string;
}

export default function IpfsImage({ hash }: IpfsImageProps): JSX.Element {
	const src = `https://ipfs.io/ipfs/${hash}`;

	return <img src={src} alt="" />;
}
