import { getApiSupport, APIName } from '../';

/**
 * Wrap tab api
 */
export default class TabsApi {
    /**
     * Tab query wrapper
     */
    query(queryInfo: chrome.tabs.QueryInfo, callback?: (results: chrome.tabs.Tab[]) => void): void {
        switch (getApiSupport()) {
            case APIName.chrome:
                chrome.tabs.query(queryInfo, callback) as any;
                break;
            case APIName.browser:
                browser.tabs.query(queryInfo).then(callback, (error) => {
                    throw error;
                });
                break;

        }
    }

    /**
     * Tab sendMessage wrapper
     */
    sendMessage(tabId: number, message: any) {
        switch (getApiSupport()) {
            case APIName.chrome:
                chrome.tabs.sendMessage(tabId, message);
                break;
            case APIName.browser:
                browser.tabs.sendMessage(tabId, message);
                break;
        }
    }
}

