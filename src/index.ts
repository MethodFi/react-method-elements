import * as React from 'react';

type TEnvironments =
  | 'production'
  | 'sandbox'
  | 'dev';

type TEventTypes =
  | 'open'
  | 'error'
  | 'exit'
  | 'success';

type TElementClientEventHandler = (payload: IElementClientOnEventPayload) => void;

type TEventHandler = (event: MessageEvent) => void;

interface IEventAccountsPayload {
  public_account_token: string;
  mask: string;
}

interface IElementClientOnEventPayload {
  op: TEventTypes;
  element_type: string;
  entity_id?: string;
  accounts?: IEventAccountsPayload[];
}

interface IElementClientOptions {
  env?: TEnvironments,
  onEvent?: TEventHandler,
  onSuccess?: TElementClientEventHandler,
  onError?: TElementClientEventHandler,
  onExit?: TElementClientEventHandler,
  onOpen?: TElementClientEventHandler,
}

interface IElementClient {
  open: (token: string) => void;
}

export function useMethod(opts: IElementClientOptions): IElementClient | null {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const script = window.document.createElement('script');
    script.src = 'https://static.methodfi.com/elements/v1/stable/init.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    window.document.body.appendChild(script);

    return () => {
      window.document.body.removeChild(script);
    };
  }, []);

  // @ts-ignore
  return loaded ? new window.Method(opts) : null;
}
