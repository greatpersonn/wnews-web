import { delay } from '@/shared/lib/delay';

interface MockApiResponse<T> {
  data: T;
}

export async function mockClient<T>(data: T, ms = 350): Promise<MockApiResponse<T>> {
  await delay(ms);
  return { data };
}