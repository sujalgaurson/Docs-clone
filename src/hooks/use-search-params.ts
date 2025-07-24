import {parseAsString, useQueryState} from 'nuqs';
import { parse } from 'path';

export function useSearchParams() {

  return useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
        clearOnDefault: true,
    })
  )};
