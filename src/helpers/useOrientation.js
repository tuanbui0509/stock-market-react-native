// useOrientation.tsx
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

export function useOrientation() {
    // State to hold the connection status
    const [orientation, setOrientation] = useState(
        isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
    );

    useEffect(() => {
        const callback = () => setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

        Dimensions.addEventListener('change', callback);

        return () => {
            Dimensions.removeEventListener('change', callback);
        };
    }, []);

    return orientation;
}
// import { useEffect, useState } from 'react';
// import { Dimensions } from 'react-native';

// export function useOrientation() {
//     const [orientation, setOrientation] = useState("PORTRAIT");

//     useEffect(() => {
//         Dimensions.addEventListener('change', ({ window: { width, height } }) => {
//             if (width < height) {
//                 setOrientation("PORTRAIT")
//             } else {
//                 setOrientation("LANDSCAPE")

//             }
//         })

//     }, []);

//     return orientation;
// }