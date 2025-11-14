import { Router } from 'expo-router';

interface WebViewNavigationParams {
  url: string;
  title?: string;
  loadingText?: string;
  errorTitle?: string;
  errorMessage?: string;
}

export const navigateToWebView = (
  router: Router,
  params: WebViewNavigationParams
): void => {
  const { url, title, loadingText, errorTitle, errorMessage } = params;

  router.push({
    pathname: '/(app)/webview',
    params: {
      url: encodeURIComponent(url),
      ...(title && { title: encodeURIComponent(title) }),
      ...(loadingText && { loadingText: encodeURIComponent(loadingText) }),
      ...(errorTitle && { errorTitle: encodeURIComponent(errorTitle) }),
      ...(errorMessage && { errorMessage: encodeURIComponent(errorMessage) }),
    },
  });
};

