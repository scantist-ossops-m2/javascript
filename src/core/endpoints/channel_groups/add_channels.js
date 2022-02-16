/*       */

import { AddChannelParams, ModulesInject } from '../../flow_interfaces';
import operationConstants from '../../constants/operations';
import utils from '../../utils';

export function getOperation()         {
  return operationConstants.PNAddChannelsToGroupOperation;
}

export function validateParams(modules               , incomingParams                  ) {
  let { channels, channelGroup } = incomingParams;
  let { config } = modules;

  if (!channelGroup) return 'Missing Channel Group';
  if (!channels || channels.length === 0) return 'Missing Channels';
  if (!config.subscribeKey) return 'Missing Subscribe Key';
}

export function getURL(modules               , incomingParams                  )         {
  let { channelGroup } = incomingParams;
  let { config } = modules;
  return `/v1/channel-registration/sub-key/${config.subscribeKey}/channel-group/${utils.encodeString(channelGroup)}`;
}

export function getRequestTimeout({ config }               )         {
  return config.getTransactionTimeout();
}

export function isAuthSupported()          {
  return true;
}

export function prepareParams(modules               , incomingParams                  )         {
  let { channels = [] } = incomingParams;

  return {
    add: channels.join(',')
  };
}

export function handleResponse()         {
  return {};
}
