// Lodash samples
const _ = require('lodash');

//- pick data from http request
var body = _.pick(req.body, ['text', 'completed']);

//- type checking
if (_.isBoolean(body.completed))
{
  
}
