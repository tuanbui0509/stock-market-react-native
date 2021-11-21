
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';


export function useOrientation() {
    const [orientation, setOrientation] = useState();

    useEffect(() => {

        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation("PORTRAIT")
            } else {
                setOrientation("LANDSCAPE")

            }
        })
        return () => subscription?.remove()
    });

    useEffect(() => {
        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };
        if (isPortrait()) {
            setOrientation("PORTRAIT")
        } else {
            setOrientation("LANDSCAPE")
        }
    })
    return orientation;
}