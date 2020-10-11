import { ApiMethodName } from 'src/types/ApiMethodName'
import { ApiMethod } from '../types/ApiMethod'

export const API_METHODS: Record<string, ApiMethod> = {
  getMe: {
    name: 'getMe',
    icon: 'fas fa-user-circle',
    method: 'GET',
    params: {}
  },
  setWebhook: {
    name: 'setWebhook',
    icon: 'fas fa-link',
    method: 'POST',
    params: {
      url: 'string'
    }
  },
  getUpdates: {
    name: 'getUpdates',
    icon: 'fas fa-sync',
    method: 'GET',
    params: {
      offset: 'number',
      limit: 'number',
      timeout: 'number'
    }
  },
  sendMessage: {
    name: 'sendMessage',
    icon: 'fas fa-paper-plane',
    method: 'POST',
    params: {
      chat_id: 'number',
      text: 'string'
    }
  },
  getMyCommands: {
    name: 'getMyCommands',
    icon: 'fas fa-list',
    method: 'GET',
    params: {}
  },
  getWebhookInfo: {
    name: 'getWebhookInfo',
    icon: 'fas fa-info',
    method: 'GET',
    params: {}
  },
  getChat: {
    name: 'getChat',
    icon: 'fas fa-comments',
    method: 'GET',
    params: {
      chat_id: 'string'
    }
  },
}

export const AVAILABLE_METHODS: ApiMethodName[] = Object.keys(API_METHODS)
