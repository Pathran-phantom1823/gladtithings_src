import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/';
export default {
  auth: apiUrl + 'authenticate',
  authUser: apiUrl + 'authenticate/user',
  authRefresh: apiUrl + 'authenticate/refresh',
  authInvalidate: apiUrl + 'authenticate/invalidate',
  socialAuth: apiUrl + 'social/social-user',
  accountRetrieve: apiUrl + 'accounts/retrieve',
  accountUpdate: apiUrl + 'accounts/update',
  accountCreate: apiUrl + 'accounts/create',
  notificationsRetrieve: apiUrl + 'notifications/retrieve_synqt_notifications',
  notificationUpdate: apiUrl + 'notifications/update',
  notificationCreate: apiUrl + 'notifications/create',
  notificationDelete: apiUrl + 'notifications/delete',
  accountProfileCreate: apiUrl + 'account_profiles/create',
  accountProfileUpdate: apiUrl + 'account_profiles/update',
  accountProfileRetrieve: apiUrl + 'account_profiles/retrieve',
  accountInformationRetrieve: apiUrl + 'account_informations/retrieve',
  accountInformationUpdate: apiUrl + 'account_informations/update',
  emailAlert: apiUrl + 'emails/alert',
  locationCreate: apiUrl + 'locations/create',
  locationRetrieve: apiUrl + 'locations/retrieve',
  locationDelete: apiUrl + 'locations/delete',
  addAddress: apiUrl + 'locations/create',
  imageUpload: apiUrl + 'images/upload',
  imageRetrieve: apiUrl + 'images/retrieve',
  filters: apiUrl + 'dashboard/categories',
  ratingsCreate: apiUrl + 'ratings/create',
  ratingsUpdate: apiUrl + 'ratings/update',
  ratingsRetrieve: apiUrl + 'ratings/retrieve',
  ratingsMerchantRetrieve: apiUrl + 'merchants/retrieve_with_rating',
  commentsRetrieve: apiUrl + 'comments/retrieve_comments',
  commentsCreate: apiUrl + 'comments/create',
  commentsDelete: apiUrl + 'comments/delete',
  commentMembersCreate: apiUrl + 'comment_members/create',
  commentRepliesCreate: apiUrl + 'comment_replies/create',
  merchantsRetrieve: apiUrl + 'account_merchants/retrieve_with_featured_photos',
  merchantOneRetrieve: apiUrl + 'merchants/retrieve',
  ledgerDirectTransfer: apiUrl + 'ledger/direct_transfer',
  notificationSettingsRetrieve: apiUrl + 'notification_settings/retrieve',
  notificationSettingsUpdate: apiUrl + 'notification_settings/update',
  notificationSettingOtp: apiUrl + 'notification_settings/update_otp',
  notificationSettingsCreate: apiUrl + 'notification_settings/create',
  ledgerDashboard: apiUrl + 'ledger/dashboard',
  ledgerSummary: apiUrl + 'ledger/summary',
  ledgerTransfer: apiUrl + 'ledger/transfer',
  transactionHistoryRetrieve: apiUrl + 'ledger/transaction_history',
  ledgerCreate: apiUrl + 'ledger/create',
  createPaymentIntent: apiUrl + 'stripe_webhooks/create_payment_intent',
  createPaymentMethod: apiUrl + 'cash_payments/create_method_mobile',
  pageCreate: apiUrl + 'pages/create',
  pageUpdate: apiUrl + 'pages/update',
  pageDelete: apiUrl + 'pages/delete',
  pageRetrieve: apiUrl + 'pages/retrieve',
  paypalCreateOrder: apiUrl + 'paypal/create_order',
  paypalCaptureOrder: apiUrl + 'paypal/capture_order',
  uploadImage: apiUrl + 'payloads/create',
  imageUploadBase64: apiUrl + 'images/upload_base64',
  imageUploadUnLink: apiUrl + 'images/upload_un_link',
  commentsRetrieveWithImages: apiUrl + 'comments/retrieve_comments_with_images',
  SubscriptionCreate: apiUrl + 'subscriptions/create',
  SubscriptionUpdate: apiUrl + 'subscriptions/update',
  SubscriptionDelete: apiUrl + 'subscriptions/delete',
  SubscriptionRetrieveByParams: apiUrl + 'subscriptions/retrieve_by_params',
  paymentMethodsRetrieve: apiUrl + 'payment_methods/retrieve',
  ledgerRetrieve: apiUrl + 'ledger/retrieve',
  imageUploadArray: apiUrl + 'images/upload_image64_array',
  eventsRetrieve: apiUrl + 'events/retrieve',
};
