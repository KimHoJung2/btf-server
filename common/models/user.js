'use strict';

module.exports = (User) => {
  User.observe('before save', function (context, next) {
    const updatedDate = new Date();

    if (context.instance) {
      context.instance.emailVerified = true;
      context.instance.created = updatedDate;
      context.instance.updated = updatedDate;
    } else {
      if (!context.currentInstance) {
        return next();
      } else {
        context.data.updated = updatedDate;
      }
    }

    return next();
  });

  User.profile = (req, cb) => {
    return cb(null, req.userInfo);
  };

  User.beforeRemote('find', function (context, modelInstance, next) {
    if (context.args.filter.where) {
      if (context.args.filter.where.and) {
        context.args.filter.where.and.push({ ownerId: context.req.storeId });
        context.args.filter.where.and.push({ storeName: '' });
      } else {
        context.args.filter.where = {
          and: [
            context.args.filter.where,
            { ownerId: context.req.storeId },
            { storeName: '' }
          ]
        }
      }
    } else {
      context.args.filter['where'] = { and: [{ ownerId: context.req.storeId }, { storeName: '' }] };
    }

    return next();
  });

  User.beforeRemote('count', function (context, modelInstance, next) {
    if (context.args.where && context.args.where.and) {
      context.args.where.and.push({ ownerId: context.req.storeId });
      context.args.where.and.push({ storeName: '' });
    } else {
      context.args.where = {
        and: [
          context.args.where,
          { ownerId: context.req.storeId },
          { storeName: '' }
        ]
      }
    }

    return next();
  });

  User.beforeRemote('destroyAll', function (context, modelInstance, next) {
    if (context.args.where && context.args.where.and) {
      context.args.where.and.push({ ownerId: context.req.storeId });
    } else {
      context.args.where = {
        and: [
          context.args.where,
          { ownerId: context.req.storeId }
        ]
      }
    }
    return next();
  });

  User.beforeRemote('create', function (context, modelInstance, next) {
    context.args.data.ownerId = context.req.storeId;

    if (context.args.data.role && context.args.data.role === 'makers') {
      context.args.data.storeName = context.args.data.username;
    } else {
      context.args.data.storeName = '';
    }

    return next();
  });
};
