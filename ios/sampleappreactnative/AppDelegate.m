//
// Copyright © 2018 HERE Global B.V. All rights reserved.
//

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <HereSDKCoreKit/HereSDKManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  // Configures the global log level setting, which determines the level of logs that are printed to the console.
  [HereSDKManager configureLoggingLevel:HereSDKLoggingLevelInfo];
  
  // Configures the global that determines whether network calls can be made over a cellular connection. The default is `NO`.
  [HereSDKManager allowCellularAccess:YES];
  
  //Configures the HereSDK and starts its services. This method should be called after the app is launched and before using HereSDK services.
  [HereSDKManager configure];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"sampleappreactnative"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
