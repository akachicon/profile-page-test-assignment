import { useMediaQuery } from '@material-ui/core';
import theme from '@/lib/theme';

// If we do not use noSsr option (false by default), then
// the first value returned on the client will be the
// defaultMatches value. The hook utilizes useEffect to
// 'immediately' update the match after mounting, thus,
// if the actual match differs from the default, we will
// get rerender and possibly remount some dom nodes.

// The above results in a problem when we use the hook
// during rendering any non-initial components on the client.
// E.g. a button caption which should render only on the
// desktop will blink on the mobile if the defaultMatches
// value is set to true and the query is something like
// theme.breakpoints.up('md').

// To avoid such situation we use noSsr option on the client
// and provide ssrMatchMedia function on the server, which
// allows for consistency even if we don't actually perform
// any checks. It can result in react dom mismatch when
// the hook used on initial render, so we provide additional
// arg.

// Source:
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/useMediaQuery/useMediaQuery.js

function ssrMatchMedia(query) {
  const isBelowSm = [
    theme.breakpoints.only('xs'),
    theme.breakpoints.down('xs'),
    theme.breakpoints.down('sm'),
  ].includes(query);

  // Treat all theme queries below 'sm' as true.
  if (isBelowSm) {
    return true;
  }

  // Treat unknown queries as false.
  return false;
}

export default function useSmallScreenMatch(initialRender = true) {
  return useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: !__IS_SERVER__ && !initialRender,
    ssrMatchMedia,
  });
}
