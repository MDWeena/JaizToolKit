import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { WebViewComponent } from '@/components/shared/webview';

export default function WebViewPage() {
  const { url, title, loadingText, errorTitle, errorMessage } =
    useLocalSearchParams<{
      url: string;
      title?: string;
      loadingText?: string;
      errorTitle?: string;
      errorMessage?: string;
    }>();

  if (!url) {
    return (
      <WebViewComponent
        url=""
        title="Error"
        errorTitle="Invalid URL"
        errorMessage="No URL provided"
      />
    );
  }

  return (
    <WebViewComponent
      url={decodeURIComponent(url)}
      title={title ? decodeURIComponent(title) : undefined}
      loadingText={loadingText ? decodeURIComponent(loadingText) : undefined}
      errorTitle={errorTitle ? decodeURIComponent(errorTitle) : undefined}
      errorMessage={errorMessage ? decodeURIComponent(errorMessage) : undefined}
    />
  );
}

