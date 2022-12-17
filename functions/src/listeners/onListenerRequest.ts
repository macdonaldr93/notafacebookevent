import * as functions from 'firebase-functions';

import * as logger from '../utilities/logger';
import { ListenerCallback, ListenerChangeCallback } from './types';

export const onCreateListenerRequest = (
  documentPath: string,
  callback: ListenerCallback,
) => {
  return functions.firestore
    .document(documentPath)
    .onCreate((snapshot, context) => {
      logger.info('Triggering for create', {
        id: snapshot.id,
        createTime: snapshot.createTime.toDate().toISOString(),
      });

      return callback(snapshot, context);
    });
};

export const onChangeListenerRequest = (
  documentPath: string,
  callback: ListenerChangeCallback,
) => {
  return functions.firestore
    .document(documentPath)
    .onUpdate(({ before, after }, context) => {
      logger.info('Triggering for change', {
        id: after.id,
        changeTime: after.updateTime.toDate().toISOString(),
      });

      return callback({ before, after }, context);
    });
};

export const onDeleteListenerRequest = (
  documentPath: string,
  callback: ListenerCallback,
) => {
  return functions.firestore
    .document(documentPath)
    .onDelete((snapshot, context) => {
      logger.info('Triggering for delete', {
        id: snapshot.id,
        createTime: snapshot.createTime.toDate().toISOString(),
      });

      return callback(snapshot, context);
    });
};
