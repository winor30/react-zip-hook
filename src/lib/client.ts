import fetchJsonp from 'fetch-jsonp';
import { Address } from "./type";

const ENDPOINT = 'https://zipcloud.ibsnet.co.jp/api/search';

interface AddressResponse {
  status: number;
  message: string;
  results: Address[];
}

/**
 * fetch address from http://zipcloud.ibsnet.co.jp/doc/api
 */
const fetchAddress = (zipcode: string, limit?: number): Promise<[Address[], null] | [null, Error]> => {
  return new Promise<Address[]>((resolve, reject) => {
    const query = new URLSearchParams();
    query.append('zipcode', zipcode);
    if (limit) {
      query.append('limit', `${limit}`);
    }
    fetchJsonp(`${ENDPOINT}?${query.toString()}`).then(res => res.json()).then((data: AddressResponse) => {
      if (data.status !== 200) {
        const cause = new Error(data.message);
        reject(cause);
        return;
      }
      resolve(data.results);
    })
  }).then(addresses => {
    return [addresses, null] as [Address[], null];
  }).catch((e: Error) => {
    return [null, e] as ([null, Error]);
  })
}

const client = { fetchAddress }

export default client;
