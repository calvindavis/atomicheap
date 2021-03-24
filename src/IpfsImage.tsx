import { h, JSX } from "preact";

export function getIpfsUrl(hash: string): string {
	return `https://ipfs.io/ipfs/${hash}`;
}

export interface IpfsImageProps {
	hash: string;
}

export default function IpfsImage({ hash }: IpfsImageProps): JSX.Element {
	return <img src={getIpfsUrl(hash)} alt="" />;
}
