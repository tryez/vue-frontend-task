export function throttle(callback, interval) {
    let isThrottled = false;
    let lastArgs = null;

    return function(...args) {
        if (!isThrottled) {
            // console.log('1 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this)
            callback.apply(this, args);
            
            isThrottled = true;

            setTimeout(() => {
                isThrottled = false;

                // if a call was attempted during throttle period, run it now
                // console.log('lastArgs', lastArgs)
                if (lastArgs) {
                    // console.log('2 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this)
                    callback.apply(this, lastArgs);
                    
                    lastArgs = null;
                    isThrottled = true;

                    // throttle again for the trailing call
                    setTimeout(() => {
                        isThrottled = false;
                    }, interval);
                }
            }, interval);
        } else {
            lastArgs = args;
        }
    };
}