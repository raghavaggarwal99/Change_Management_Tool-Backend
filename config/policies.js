/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  'pages/request': 'is-logged-in',

  'pages/sentrequests': 'is-logged-in',

  'pages/deleterequest': 'is-logged-in',

  'pages/changerequeststatus': 'is-logged-in',

  'pages/profile': 'is-logged-in',

  'pages/dashboard': 'is-logged-in',



};
