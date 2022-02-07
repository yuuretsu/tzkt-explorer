export function buildApi(url: string) {
  return async (route: string, params: any = {}) =>
    await fetch(`${url}${route}?` + new URLSearchParams(params)).then(
      (resp) => resp.text()
    );
}

export const tzkt = buildApi("https://api.tzkt.io/v1");