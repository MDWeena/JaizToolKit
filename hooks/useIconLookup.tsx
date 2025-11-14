import {
    accounts,
    accountTypeData,
    bankingChannelsData,
    cardsData,
    categoriesData,
    IndividualAccountData,
    individualAccountsData,
    Jaiz3AccountData,
    loansData,
    openAccountData,
    otherProductsData,
    productsData,
    resourcesData,
    TeenAccountData,
    functionsData,
    serviceRequestData,
    quickLinksData,
    usefulCodesData,
    directoriesData,
    rmData,
    
} from '@/constants/data';
import { PageItem } from '@/types/page';
import React, { useMemo } from 'react';

const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '');
};


export const useIconLookup = () => {
  const allDataSources = useMemo<PageItem[]>(() => {
    return [
      ...categoriesData,
      ...productsData,
      ...accountTypeData,
      ...individualAccountsData,
      ...loansData,
      ...cardsData,
      ...bankingChannelsData,
      ...otherProductsData,
      ...openAccountData,
      ...IndividualAccountData,
      ...TeenAccountData,
      ...Jaiz3AccountData,
      ...resourcesData,
      ...accounts,
      ...functionsData,
      ...serviceRequestData,
      ...quickLinksData,
      ...usefulCodesData,
      ...directoriesData,
      ...rmData,
    ];
  }, []);

  const getIconByText = useMemo(
    () => (text: string): React.ReactNode => {
      const normalizedText = normalizeText(text);
      const item = allDataSources.find(
        (item) => normalizeText(item.text) === normalizedText
      );
      return item?.icon || null;
    },
    [allDataSources]
  );

  return { getIconByText };
};

