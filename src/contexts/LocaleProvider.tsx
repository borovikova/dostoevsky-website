import React from "react";
import { TargemProvider, Utils } from "react-targem";
import { DEFAULT_LOCALE, Locale, LOCALE_CODES } from "src/config/locales";
import {
  getLinkForLocale,
  getLocaleFromPath,
  isSupportedLocaleInPath,
} from "src/utils/locales";
// translation.json file is autogenerated and ignored
// so we use require() to prevent tsc compile time errors before webpack is first run
// eslint-disable-next-line @typescript-eslint/no-var-requires
const translationsJson = require("src/i18n/translations.json");

interface LocaleProviderProps {
  location: Location;
}

interface LocaleProviderState {}

export class LocaleProvider extends React.Component<
  LocaleProviderProps,
  LocaleProviderState
> {
  public state: LocaleProviderState = {};

  public componentDidMount(): void {
    const { location } = this.props;
    const path = location.pathname;
    if (path.includes("admin")) {
      return;
    }
    if (!isSupportedLocaleInPath(path)) {
      const defaultLocale = Utils.getBrowserLocale(
        LOCALE_CODES,
        DEFAULT_LOCALE
      ) as Locale;
      window.location.replace(
        getLinkForLocale(defaultLocale, location.pathname, location.search)
      );
    }
  }

  public render(): React.ReactNode {
    const { children, location } = this.props;
    return (
      <>
        <TargemProvider
          detectLocale={false}
          locale={getLocaleFromPath(location.pathname)}
          defaultLocale={DEFAULT_LOCALE}
          translations={translationsJson}
        >
          {children}
        </TargemProvider>
      </>
    );
  }
}
