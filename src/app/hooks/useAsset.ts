import { useEffect, useState } from "react";

const getAssetBuffer = async (url: string) => {
    return await window.lcuApi.getAsset(url);
}

const convertBufferToBase64 = (buffer: Buffer) => {
    if (!buffer) return undefined;
    return `data:image/png;base64,${btoa(buffer.reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
}

export function useAsset(url?: string) {
    const returnedObject = {
        getAsset: async (url: string) => {
            return convertBufferToBase64(await getAssetBuffer(url));
        },
        img: undefined
    };

    if (url) {
        const [img, setImg] = useState<string | undefined>(undefined);
        useEffect(() => {
            (async () => {
                const buffer = await getAssetBuffer(url);
                const base64 = convertBufferToBase64(buffer)
                setImg(base64);
            })();
        }, [setImg, url]);
        return { ...returnedObject, img: img ?? undefined };
    }

    return returnedObject;
}