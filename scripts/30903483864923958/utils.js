export function isMobileDevice() {
    console.group('Mobile Detection Debug:');
    const hasTouch = 'ontouchstart' in window;
    console.log('Has touch events:', hasTouch);
    const hasOrientation = typeof window.orientation !== 'undefined';
    console.log('Has orientation:', hasOrientation);
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    console.log('Has coarse pointer:', hasCoarsePointer);
    const hasAnyCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;
    console.log('Has any coarse pointer:', hasAnyCoarsePointer);
    console.log('Window inner width:', window.innerWidth);
    console.log('Touch points:', navigator.maxTouchPoints);
    console.log('User Agent:', navigator.userAgent);
    const isMobile = hasTouch && (hasOrientation || hasCoarsePointer || hasAnyCoarsePointer);
    console.log('Final result - Is Mobile:', isMobile);
    console.groupEnd();
    return isMobile;
}
