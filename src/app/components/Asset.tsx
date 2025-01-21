import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsset } from '../hooks/useAsset';

export default function Asset({ src, ...rest }: { src: string }) {
    const { img } = useAsset(src);
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        onChange: (inView) => {
            if (inView) {
                setIsVisible(true);
            }
        },
    });

    return (
        <div ref={ref}>
            {isVisible && <img loading="lazy" src={img} {...rest} />}
        </div>
    );
}