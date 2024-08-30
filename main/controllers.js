var app = angular
  .module("app")
  .controller("mainController", [
    "$scope",
    "$http",
    "$rootScope",
    "$window",
    "printService",
    "FileSaver",
    "Blob",
    "$location",
    "$interval",
    "$timeout",
    function (
      $scope,
      $http,
      $rootScope,
      $window,
      printService,
      FileSaver,
      Blob,
      $location,
      $interval,
      $timeout
    ) {
      $scope.user_email = "guest@gmail.com";
      $scope.user_password = "Guest User";
      $scope.establish_server_connections = function () {
        $scope.local_server = {
          name: "Local server",
          link: "http://localhost:8000",
        };
        $scope.transaction_server = {
          name: "Cassandra express server",
          link: "http://103.15.51.249:1337",
        };
        // $scope.socket = io.connect($scope.local_server.link, { 'force new connection': true } );
        // $scope.heroku_socket = io.connect($scope.transaction_server.link, { 'force new connection': true } );
        // $scope.socket.on("serialdevice_connected_sent_by_server", function(data) {
        //   jQuery("#page_loading").show();
        //   $scope.custom_timeout = $timeout(function() {
        //     jQuery("#page_loading").hide();
        //     var obj = {
        //       name: "USB Bluetooth Donggle",
        //       icon: "images/usb.png",
        //       detail_info: data,
        //     };
        //     $scope.connected_devices.push(obj);
        //     $scope.$apply(function() {
        //       $scope.should_display_connected_devices = $scope.show_if_length_larger_than_0($scope.connected_devices);
        //     });
        //     $timeout.cancel($scope.custom_timeout);
        //     $scope.custom_timeout = null;
        //   }, 2100);
        // });
        // $scope.socket.on("port_unplugged_successfully_sent_by_server", function(port) {
        //   var ind = $scope.connected_devices.indexOf(port);
        //   $scope.connected_devices.splice(ind, 1);
        //   $scope.$apply(function() {
        //     $scope.should_display_connected_devices = $scope.show_if_length_larger_than_0($scope.connected_devices);
        //   });
        //   $scope.close_message_box();
        //   $scope.loading_message = "Connecting serial port device. Please wait...";
        //   $scope.custom_timeout = $timeout(function() {
        //     $scope.$apply(function() {
        //       $scope.port_to_be_displayed_in_message_box = null;
        //     });
        //     $timeout.clear($scope.custom_timeout);
        //     $scope.custom_timeout = null;
        //   }, 800);
        // });
        // $scope.socket.on("port_closed_successfully_sent_by_server", function() {
        //   $scope.custom_timeout = $timeout(function() {
        //     $scope.open_message_box();
        //     jQuery("#page_loading").hide();
        //     $timeout.cancel($scope.custom_timeout);
        //     $scope.custom_timeout = null;
        //   }, 2100);
        // });
      };
      $scope.configure_on_pageload = function () {
        jQuery("#message_box").hide();
        jQuery("#page_loading").hide();
        jQuery("#spime_message_box").hide();
        jQuery("#smallPopup_messagebox").tinyDraggable({ handle: ".header" });
        jQuery(".general_black_box_dragable").tinyDraggable({
          handle: ".header",
        });
        jQuery("#mailApp").tinyDraggable({ handle: ".app_topBar" });
        jQuery("#settingApp").tinyDraggable({ handle: ".app_topBar" });
        var vw = jQuery(window).width();
        if (vw <= 1280) {
          $scope.change_to_small_screen_layout();
        } else {
          $scope.change_to_large_screen_layout();
        }
      };
      $scope.handle_jquery_events = function () {
        jQuery("#rightCollumn").on("click", function () {
          $scope.left_navigator_count = 0;
          $scope.right_navigator_count = 0;
          jQuery("#leftNavigator").animate(
            {
              left: -308,
            },
            400
          );
          jQuery("#rightNavigator").animate(
            {
              right: -318,
            },
            400
          );
          jQuery("#rightCollumn").animate(
            {
              "margin-left": 0,
            },
            400
          );
        });
        jQuery(window).on("resize", function () {
          var vw = jQuery(window).width();
          if (vw <= 1280) {
            $scope.change_to_small_screen_layout();
          } else {
            $scope.change_to_large_screen_layout();
          }
        });
        jQuery("#suboption_bgImage").on("click", function () {
          jQuery(".content_area_setting").hide();
          jQuery("#div_background_image").fadeIn(400);
        });
        jQuery("#suboption_appView").on("click", function () {
          jQuery(".content_area_setting").hide();
          jQuery("#div_setting_default").fadeIn(400);
        });
      };
      $scope.initiate_global_variables = function () {
        if (!$window.localStorage["cassandra_should_hide_login"]) {
          $window.localStorage["cassandra_should_hide_login"] = "no";
        }
        // $window.localStorage["cassandra_should_hide_login"] = "no";
        console.log($window.localStorage["cassandra_should_hide_login"]);
        if ($window.localStorage["cassandra_background_image_link"]) {
          $scope.custom_background = JSON.parse(
            $window.localStorage["cassandra_background_image_link"]
          );
        } else {
          $scope.custom_background = "background/win.png";
        }
        if ($window.localStorage["cassandra_background_images"]) {
          $scope.background_images = JSON.parse(
            $window.localStorage["cassandra_background_images"]
          );
        } else {
          $scope.background_images = [
            {
              name: "Canon",
              link: "background/canon.png",
              is_selected: false,
            },

            {
              name: "Valley",
              link: "background/valley.png",
              is_selected: false,
            },

            {
              name: "Forest",
              link: "background/forest.jpeg",
              is_selected: false,
            },
            {
              name: "Hill",
              link: "background/hill.png",
              is_selected: false,
            },
            {
              name: "Donate",
              link: "background/donate.png",
              is_selected: false,
            },

            {
              name: "Lubu",
              link: "background/lubu.jpg",
              is_selected: false,
            },
            {
              name: "Mountain",
              link: "background/mountain.jpg",
              is_selected: false,
            },
            {
              name: "Rocket",
              link: "background/rocket.jpg",
              is_selected: false,
            },
            {
              name: "Tower",
              link: "background/tower.png",
              is_selected: false,
            },
            {
              name: "Window",
              link: "background/win.png",
              is_selected: true,
            },
          ];
        }
        $scope.settings = [
          {
            name: "Window appearance",
            element_id: "option_winAppear",
            sub_options: [
              {
                name: "Background image",
                image: "images/options/image.png",
                element_id: "suboption_bgImage",
              },
              {
                name: "View mode",
                image: "images/options/view.png",
                element_id: "suboption_appView",
              },
              {
                name: "Widget design",
                image: "images/options/widget.png",
                element_id: "suboption_cardTrans",
              },
            ],
          },
          {
            name: "Detection algorithm",
            element_id: "option_detectAlgo",
            sub_options: [
              {
                name: "Algorithm design",
                image: "images/options/design.png",
                element_id: "suboption_algoDesign",
              },
            ],
          },
          {
            name: "Records managament",
            element_id: "option_recordMana",
            sub_options: [
              {
                name: "Automatic Sync",
                image: "images/options/backup.png",
                element_id: "suboption_autoSync",
              },
              {
                name: "Storage",
                image: "images/options/storage.png",
                element_id: "suboption_storage",
              },
            ],
          },
        ];
        $scope.connected_devices = [];
        $scope.left_navigator_count = 0;
        $scope.right_navigator_count = 0;
        $scope.loading_message = "Under processing. Please wait...";
        $scope.should_display_connected_devices = false;
        $scope.port_to_be_displayed_in_message_box;
        $scope.notifications = [
          {
            title: "Version 1.0 publised",
            sender: "Nguyen, Pham",
            action: {
              type: "redirect",
              link: "/personal",
              extra: "",
            },
          },
          {
            title: "New messages received",
            sender: "Hung, Le",
            action: {
              type: "redirect",
              link: "/messages",
              extra: "",
            },
          },
        ];
        $scope.doctors = [];
        $scope.devices = [];
        $scope.messages = [];
        $scope.chat_messages = [];
        $scope.currentMailType = "inbox";
        $scope.clickedMail = {
          title: "",
          fromAvarta: "",
          date: "",
          content: "",
          from: "",
        };
        $scope.newMails = [
          {
            title: "Spime Version 2.0 announcement",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyen.png",
            to: "Nguyen Pham",
            date: "14/12/2015",
            content:
              "Dear our treasured candidates,<br/>Spime Core Team is currently developing the second module of the website. We hope that we could make it in time in April 24th.<br/>If you find our project interesting please help us improve the products by participating in.<br/>Here are some requirements:<br/>     1.    Good at working independently<br/>     2.    Love Angular js and Css technique<br/>     3.    Willing to work without MONEY<br/>If you still want to help us accomplish our goal in spite of the hardship, we would be very pround to have you side by side as a core team member.<br/>Thank you very much for reading this letter. Spime team wishes you a new nice day of work.<br/>Khoi Nguyen",
          },
          {
            title: "Academic revise 12/2015",
            from: "Nguyen Anh",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/anh2.png",
            to: "Nguyen Pham",
            date: "11/12/2015",
            content:
              "Dear Nguyen,<br/>Please send me the revised version of your academic transcript. I need it for contacting your university.<br/>Thank you,<br/>Nguyen Anh",
          },
          {
            title: "Military Education",
            from: "Kieu Khanh",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/phuong2.png",
            to: "Nguyen Pham",
            date: "8/12/2015",
            content:
              "Hi Nguyen,<br/>Miss Hien announce that we should go top the Student OSA room to take our certification for completing military education.<br/>Best,<br/>Khanh",
          },
          {
            title: "Congratz on winning the Startup event",
            from: "Huy Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/huy2.png",
            to: "Nguyen Pham",
            date: "1/12/2015",
            content:
              "We win it !<br/>Will yopu consider celebrating? This time we gonna invite Miss An and Mr Trung for sure.<br/>Huy",
          },
          {
            title: "About Research 3A project",
            from: "Trung Le",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyenminhthanh.png",
            to: "Nguyen Pham",
            date: "28/11/2015",
            content:
              "Dear Nguyen,<br/>I would like you to complete the student research log for the Research 3A Project. Please work on it untill September 28th so that we could have time to revise.<br/>Best,<br/>",
          },
          {
            title: "Business Plan revised",
            from: "Thinh Nguyen",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyenphihung.png",
            to: "Nguyen Pham",
            date: "13/12/2015",
            content: "",
          },
          {
            title: "Pictures of the event",
            from: "Thu Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/thu2.png",
            to: "Nguyen Pham",
            date: "14/11/2015",
            content: "",
          },
          {
            title: "Group Work on Monday",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/trung2.png",
            to: "Nguyen Pham",
            date: "11/12/2015",
            content: "",
          },
        ];
        $scope.outMails = [
          {
            title: "Spime Version 2.0 announcement",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyen.png",
            to: "Nguyen Pham",
            date: "14/12/2015",
            content:
              "Dear our treasured candidates,<br/>Spime Core Team is currently developing the second module of the website. We hope that we could make it in time in April 24th.<br/>If you find our project interesting please help us improve the products by participating in.<br/>Here are some requirements:<br/>     1.    Good at working independently<br/>     2.    Love Angular js and Css technique<br/>     3.    Willing to work without MONEY<br/>If you still want to help us accomplish our goal in spite of the hardship, we would be very pround to have you side by side as a core team member.<br/>Thank you very much for reading this letter. Spime team wishes you a new nice day of work.<br/>Khoi Nguyen",
          },
          {
            title: "Amato Gozila",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/phuong2.png",
            to: "Nguyen Pham",
            date: "11/12/2015",
            content:
              "Dear Nguyen,<br/>Please send me the revised version of your academic transcript. I need it for contacting your university.<br/>Thank you,<br/>Nguyen Anh",
          },
          {
            title: "Children of The North",
            from: "Kieu Khanh",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/anh2.png",
            to: "Nguyen Pham",
            date: "8/12/2015",
            content:
              "Hi Nguyen,<br/>Miss Hien announce that we should go top the Student OSA room to take our certification for completing military education.<br/>Best,<br/>Khanh",
          },
          {
            title: "Hulu Hula",
            from: "Huy Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/trung2.png",
            to: "Nguyen Pham",
            date: "1/12/2015",
            content:
              "We win it !<br/>Will yopu consider celebrating? This time we gonna invite Miss An and Mr Trung for sure.<br/>Huy",
          },
        ];
      };
      $scope.initiate_global_functions = function () {
        $scope.is_selected = function (value) {
          if (value) {
            return "2px solid rgb(84,151,211);";
          } else {
            return "2px solid transparent;";
          }
        };
        $scope.select_this_image_as_background = function (index) {
          $window.localStorage["cassandra_should_hide_login"] = "no";
          var should_choose_this_bg = confirm(
            "Changing background-image will cause the app to restart. If it does not restart automatically, please quit and re-open the app. Do you want to proceed?"
          );
          if (should_choose_this_bg) {
            $scope.custom_background = $scope.background_images[index].link;
            $window.localStorage["cassandra_background_image_link"] =
              JSON.stringify($scope.custom_background);
            for (var loop = 0; loop < $scope.background_images.length; loop++) {
              if ($scope.background_images[loop].is_selected) {
                $scope.background_images[loop].is_selected = false;
                break;
              }
            }
            $scope.background_images[index].is_selected = true;
            $window.localStorage["cassandra_background_images"] =
              JSON.stringify($scope.background_images);
            $scope.custom_timeout = $timeout(function () {
              $timeout.cancel($scope.custom_timeout);
              $scope.custom_timeout = null;
              // $scope.socket.emit("change_background_image_require_app_restart");
            }, 600);
          }
        };
        $scope.initiate_gridster = function () {
          var gridster = null;
          gridster = jQuery(".gridster ul")
            .gridster({
              widget_base_dimensions: ["auto", 100],
              autogenerate_stylesheet: true,
              min_cols: 1,
              max_cols: 3,
              widget_margins: [0, 5],
              resize: {
                enabled: true,
              },
              draggable: {
                enabled: true,
              },
              avoid_overlapped_widgets: true,
              // widget_selector: ">li",
            })
            .data("gridster");
          jQuery(".gridster  ul").css({ padding: "0" });
          // gridster.disable();
        };
        $scope.resize_gridster = function () {
          $scope.custom_timeout = $timeout(function () {
            $scope.initiate_gridster();
            $timeout.cancel($scope.custom_timeout);
            $scope.custom_timeout = null;
          }, 1000);
        };
        $scope.show_left_navigator = function () {
          jQuery("#leftNavigator").animate(
            {
              left: 0,
            },
            400
          );
          jQuery("#rightCollumn").animate(
            {
              "margin-left": 40,
            },
            400
          );
          $scope.right_navigator_count = 0;
          jQuery("#rightNavigator").animate(
            {
              right: -318,
            },
            400
          );
        };
        $scope.hide_left_navigator = function () {
          jQuery("#leftNavigator").animate(
            {
              left: -308,
            },
            400
          );
          jQuery("#rightCollumn").animate(
            {
              "margin-left": 0,
            },
            400
          );
        };
        $scope.show_right_navigator = function () {
          jQuery("#rightNavigator").animate(
            {
              right: 0,
            },
            400
          );
          jQuery("#rightCollumn").animate(
            {
              "margin-left": -40,
            },
            400
          );
          $scope.left_navigator_count = 0;
          jQuery("#leftNavigator").animate(
            {
              left: -308,
            },
            400
          );
        };
        $scope.hide_right_navigator = function () {
          jQuery("#rightNavigator").animate(
            {
              right: -318,
            },
            400
          );
          jQuery("#rightCollumn").animate(
            {
              "margin-left": 0,
            },
            400
          );
        };
        $scope.toggle_left_navigator = function () {
          $scope.left_navigator_count += 1;
          if ($scope.left_navigator_count % 2 == 1) {
            $scope.show_left_navigator();
          } else {
            $scope.hide_left_navigator();
          }
        };
        $scope.toggle_right_navigator = function () {
          $scope.right_navigator_count += 1;
          if ($scope.right_navigator_count % 2 == 1) {
            $scope.show_right_navigator();
          } else {
            $scope.hide_right_navigator();
          }
        };
        $scope.open_message_box = function () {
          jQuery("#message_box").show();
          jQuery("#message_box > form > .div_small_popup").animate(
            {
              top: 100,
              opacity: 1,
            },
            400
          );
        };
        $scope.open_spime_messgae_box = function () {
          var value = (jQuery(window).height() - 500) / 2 - 10;
          if (value < 0) {
            value = 0;
          }
          jQuery("#spime_message_box").show();
          jQuery("#mailApp").animate(
            {
              top: 76,
              opacity: 1,
            },
            400
          );
        };
        $scope.close_message_box = function () {
          jQuery("#message_box > form > .div_small_popup").animate(
            {
              top: 60,
              opacity: 0,
            },
            400,
            function () {
              jQuery("#message_box").hide();
            }
          );
        };
        $scope.close_spime_message_box = function () {
          var value = (jQuery(window).height() - 500) / 2 - 80;
          if (value < 0) {
            value = 0;
          }
          jQuery("#mailApp").animate(
            {
              top: 36,
              opacity: 0,
            },
            400,
            function () {
              jQuery("#spime_message_box").hide();
            }
          );
          $scope.hide_mail_response_section();
        };
        $scope.open_setting_box = function () {
          $scope.hide_right_navigator();
          $scope.right_navigator_count = 0;
          var value = (jQuery(window).height() - 500) / 2 - 10;
          if (value < 0) {
            value = 0;
          }
          jQuery("#setting_box").show();
          jQuery("#settingApp").animate(
            {
              top: 40,
              opacity: 1,
            },
            400
          );
        };
        $scope.close_setting_box = function () {
          var value = (jQuery(window).height() - 500) / 2 - 80;
          if (value < 0) {
            value = 0;
          }
          jQuery("#settingApp").animate(
            {
              top: 10,
              opacity: 0,
            },
            400,
            function () {
              jQuery("#setting_box").hide();
            }
          );
        };
        // REMEMBER TO COMMENT THIS FOR UBUNTU AND LINIX, IT NOT IT WILL FAILS
        $scope.tell_nodejs_to_remove_this_port = function (port) {
          $scope.port_to_be_displayed_in_message_box = port;
          $scope.loading_message = "Closing serial port device. Please wait...";
          jQuery("#page_loading").show();
          // $scope.socket.emit("client_say_nodejs_to_remove_this_port", port);
        };
        $scope.show_if_length_larger_than_0 = function (obj) {
          if (obj.length > 0) {
            return true;
          } else {
            return false;
          }
        };
        $scope.innit_login = function () {
          $scope.displayText =
            "This is just a demo version. You can log-in with any name and password. :')";
          $scope.displayStyle = "scnd-font-color";
        };
        $scope.login_failed = function () {
          $scope.displayText = "Login unsuccessful ! Password must not be 456.";
          $scope.displayStyle = "material-pink";
        };
        $scope.show_login = function () {
          $scope.user_email = "guest@gmail.com";
          $scope.user_password = "Guest User";
          jQuery("#divMain").hide();
          jQuery("#divLogin").fadeIn(400);
        };
        $scope.hide_login = function () {
          jQuery("#divLogin").fadeOut(400, function () {
            jQuery("#divMain").fadeIn(400);
          });
          $scope.custom_timeout = $timeout(function () {
            $scope.initiate_gridster();
            $timeout.cancel($scope.custom_timeout);
            $scope.custom_timeout = null;
          }, 1000);
        };
        $scope.performLogin = function () {
          var userInfo = {
            email: $scope.user_email,
            password: $scope.user_password,
          };
          userInfo.user_id =
            Math.floor(Math.random() * 1000) +
            "-" +
            Math.floor(Math.random() * 1000) +
            "-" +
            Math.floor(Math.random() * 10000);
          if (userInfo.password == 456) {
            $scope.login_failed();
          } else {
            $scope.userInfo = userInfo;
            $window.localStorage["cassandra_userInfo"] =
              JSON.stringify(userInfo);
            console.log($scope.userInfo);
            $scope.hide_login();
            $window.localStorage["cassandra_should_hide_login"] = "yes";
          }
        };
        $scope.hide_if_zero = function (array) {
          var len = array.length;
          if (len == 0) {
            return true;
          } else {
            return false;
          }
        };
        $scope.openLaboratory = function () {
          $scope.left_navigator_count = 0;
          $scope.hide_left_navigator();
          $window.open("laboratory.html", "_blank", "width=1024,height=680");
          // $scope.socket.emit("command_app_to_open_laboratory_as_new_window");
          // var win = new $scope.BrowserWindow({ width: 1024, height: 690 });
          // win.loadURL('www.google.com');
        };
        if ($window.localStorage["cassandra_userInfo"]) {
          $scope.userInfo = JSON.parse(
            $window.localStorage["cassandra_userInfo"]
          );
          $scope.userInfo.account_type = "Primary user";
          if ($window.localStorage["cassandra_should_hide_login"] == "yes") {
            $scope.hide_login();
          }
          // console.log($scope.userInfo);
        }
        $scope.change_to_large_screen_layout = function () {
          jQuery("#header_menu_button").hide();
          jQuery("#leftCollumn").show();
          jQuery("#rightCollumn").css({
            width: "calc(100vw - 308px)",
            left: 306,
          });
          $scope.hide_left_navigator();
        };
        $scope.change_to_small_screen_layout = function () {
          jQuery("#header_menu_button").show();
          jQuery("#leftCollumn").hide();
          jQuery("#rightCollumn").css({
            width: "100vw",
            left: 0,
          });
        };
        $scope.go_back_to_dashboard = function () {
          $location.url("/dashboard");
          $scope.left_navigator_count = 0;
          $scope.hide_left_navigator();
          $scope.resize_gridster();
        };
        $scope.go_to_records_page = function () {
          $location.url("/records");
          $scope.left_navigator_count = 0;
          $scope.hide_left_navigator();
        };
        $scope.go_to_personal_info_page = function () {
          $location.url("/personal");
          $scope.right_navigator_count = 0;
          $scope.hide_right_navigator();
        };
        $scope.getThisMailType = function (mailType) {
          if (mailType == "inbox") {
            return $scope.newMails;
          }
          if (mailType == "outbox") {
            return $scope.outMails;
          }
        };
        $scope.viewThisMail = function (obj) {
          var currObj = obj;
          angular
            .element("#mail_content_lbcontent")
            .$sce.trustAsHtml(currObj.content);
          anuglra
            .element("#mail_content_lbfrom")
            .trustAsHtml(currObj.from + " - " + currObj.date);
          anuglra.element("#mail_content_lbtitle").trustAsHtml(currObj.title);
        };
        $scope.clickThisMail = function (object) {
          if ($scope.hEd) {
            $scope.hide_mail_response_section();
          }
          $scope.clickedMail.content = object.content;
          $scope.clickedMail.fromAvarta = object.fromAvarta;
          $scope.clickedMail.date = object.date;
          $scope.clickedMail.title = object.title;
          $scope.clickedMail.from = object.from;
          jQuery("#mail_contentArea_noMailSelected").hide();
        };
        $scope.getLength = function (array) {
          return array.length;
        };
        $scope.bindInbox = function () {
          $scope.currentMailType = "inbox";
        };
        $scope.bindOutbox = function () {
          $scope.currentMailType = "outbox";
        };
        $scope.initiate_ckeditor = function () {
          $scope.hEd =
            CKEDITOR.instances["mailpage_congcuright_tacomposenewmail"];
          if ($scope.hEd) {
            CKEDITOR.remove($scope.hEd);
          }
          $scope.hEd = CKEDITOR.replace(
            "mailpage_congcuright_tacomposenewmail",
            {
              language: "en",
              height: "250px",
              on: {
                instanceReady: function (evt) {
                  //Set the focus to your editor
                  CKEDITOR.instances[
                    "mailpage_congcuright_tacomposenewmail"
                  ].focus();
                },
              },
            }
          );
          $scope.scroll_to_bottom_of_spime_message_box();
        };
        $scope.destroy_ckeditor = function () {
          if ($scope.hEd) {
            CKEDITOR.instances[
              "mailpage_congcuright_tacomposenewmail"
            ].destroy();
            $scope.hEd = null;
          }
        };
        $scope.display_mail_response_section = function () {
          jQuery("#mailpage_congcuright_tacomposenewmail").show();
          $scope.initiate_ckeditor();
        };
        $scope.hide_mail_response_section = function () {
          $scope.destroy_ckeditor();
          jQuery("#mailpage_congcuright_tacomposenewmail").hide();
        };
        $scope.scroll_to_bottom_of_spime_message_box = function () {
          console.log("OK");
          $scope.scroll_timeout = $timeout(function () {
            jQuery(".app_contentArea_scroll").animate(
              { scrollTop: jQuery(this).height() },
              600
            );
            $timeout.cancel($scope.scroll_timeout);
          }, 100);
        };
      };
      $scope.establish_server_connections();
      $scope.initiate_global_variables();
      $scope.initiate_global_functions();
      $scope.configure_on_pageload();
      $scope.innit_login();
      $scope.handle_jquery_events();
    },
  ])
  .controller("personalController", [
    "$scope",
    "$http",
    "$rootScope",
    "$window",
    "printService",
    "FileSaver",
    "Blob",
    "$location",
    function (
      $scope,
      $http,
      $rootScope,
      $window,
      printService,
      FileSaver,
      Blob,
      $location
    ) {
      console.log("personal");
      if ($window.localStorage["cassandra_userInfo"]) {
        $scope.userInfo = JSON.parse(
          $window.localStorage["cassandra_userInfo"]
        );
      }
      if ($window.localStorage["cassandra_my_ehealth"]) {
        $scope.ehealth = JSON.parse(
          $window.localStorage["cassandra_my_ehealth"]
        );
      } else {
        $scope.ehealth = {
          fullname: $scope.userInfo.email,
          date_of_birth: "",
          mssid: $scope.userInfo.user_id,
          sex: "",
          occupation: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          address_line_1: "",
          address_line_2: "",
          my_doctors: [
            {
              fullname: "",
              dssid: "",
              specity: "",
              work_address: "",
              phone: "",
              email: "",
            },
          ],
          location: { lat: "", lng: "" },
          medical_history: {
            history_stroke: false,
            obesity: false,
            high_blood_pressure: false,
            alcoholism: false,
          },
          clinical_symptoms: {
            chest_pain: true,
            shortness_of_breath: false,
            severe_sweating: true,
            dizziness: false,
          },
        };
      }
      $scope.updateInfo = function () {
        $window.localStorage["cassandra_my_ehealth"] = JSON.stringify(
          $scope.ehealth
        );
      };
      var handle_geolocation = function (position) {};
      $scope.get_current_location = function () {
        navigator.geolocation.getCurrentPosition(
          function success(position) {
            $scope.ehealth.location.lat = position.coords.latitude;
            $scope.ehealth.location.lng = position.coords.longitude;
            console.log(position.coords.longitude);
          },
          function error(error) {
            alert("This software version does not support geolocation");
          }
        );
      };

      $scope.init_google_map = function () {
        // var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById("google-map"), {
          zoom: 4,
          center: $scope.ehealth.location,
        });
        var marker = new google.maps.Marker({
          position: $scope.ehealth.location,
          map: map,
        });
      };
      // $scope.get_current_location();
      // $scope.init_google_map();
      $scope.test = function () {
        console.log($scope.ehealth.clinical_symptoms.dizziness);
      };
    },
  ])
  .controller("recordsController", [
    "$scope",
    "$http",
    "$rootScope",
    "$window",
    "printService",
    "FileSaver",
    "Blob",
    "$location",
    "$interval",
    "$timeout",
    "dsp",
    function (
      $scope,
      $http,
      $rootScope,
      $window,
      printService,
      FileSaver,
      Blob,
      $location,
      $interval,
      $timeout,
      dsp
    ) {
      $scope.establish_server_connections = function () {
        $scope.local_server = {
          name: "Local server",
          link: "http://localhost:8000",
        };
        $scope.transaction_server = {
          name: "Cassandra express server",
          link: "http://103.15.51.249:1337",
        };
        // $scope.socket = io.connect($scope.local_server.link, { 'force new connection': true } );
        // $scope.heroku_socket = io.connect($scope.transaction_server.link, { 'force new connection': true } );
        // $scope.socket.on("serialdevice_connected_sent_by_server", function(data) {
        //   jQuery("#page_loading").show();
        //   $scope.custom_timeout = $timeout(function() {
        //     jQuery("#page_loading").hide();
        //     var obj = {
        //       name: "USB Bluetooth Donggle",
        //       icon: "images/usb.png",
        //       detail_info: data,
        //     };
        //     $scope.connected_devices.push(obj);
        //     $scope.$apply(function() {
        //       $scope.should_display_connected_devices = $scope.show_if_length_larger_than_0($scope.connected_devices);
        //     });
        //     $timeout.cancel($scope.custom_timeout);
        //     $scope.custom_timeout = null;
        //   }, 2100);
        // });
        // $scope.socket.on("port_unplugged_successfully_sent_by_server", function(port) {
        //   var ind = $scope.connected_devices.indexOf(port);
        //   $scope.connected_devices.splice(ind, 1);
        //   $scope.$apply(function() {
        //     $scope.should_display_connected_devices = $scope.show_if_length_larger_than_0($scope.connected_devices);
        //   });
        //   $scope.close_message_box();
        //   $scope.loading_message = "Connecting serial port device. Please wait...";
        //   $scope.custom_timeout = $timeout(function() {
        //     $scope.$apply(function() {
        //       $scope.port_to_be_displayed_in_message_box = null;
        //     });
        //     $timeout.clear($scope.custom_timeout);
        //     $scope.custom_timeout = null;
        //   }, 800);
        // });
        // $scope.socket.on("port_closed_successfully_sent_by_server", function() {
        //   $scope.custom_timeout = $timeout(function() {
        //     $scope.open_message_box();
        //     jQuery("#page_loading").hide();
        //     $timeout.cancel($scope.custom_timeout);
        //     $scope.custom_timeout = null;
        //   }, 2100);
        // });
        // $scope.socket.on("save_record_to_local_server_successed", function(response) {
        //   $scope.$apply(function() {
        //     $scope.records.push(response);
        //   });
        // });
        if ($scope.userInfo) {
          // $scope.socket.emit("make_server_listen_to_this_socket", $scope.userInfo.user_id);
          var pipline_name =
            "data_from_phone_" + $scope.userInfo.user_id + "_to_server";
          var pipline_result =
            "data_from_phone_" +
            $scope.userInfo.user_id +
            "_to_server_result_to_diagnosis_app";
          var test_message = "Hello " + $scope.userInfo.email;
          // $scope.socket.emit(pipline_name, test_message);
          // $scope.socket.on(pipline_result, function(data) {
          //   console.log(data);
          // });
        }
      };
      $scope.configure_on_pageload = function () {
        jQuery("#message_box").hide();
        jQuery("#page_loading").hide();
        jQuery("#spime_message_box").hide();
        jQuery("#smallPopup_messagebox").tinyDraggable({ handle: ".header" });
        jQuery(".general_black_box_dragable").tinyDraggable({
          handle: ".header",
        });
        jQuery("#mailApp").tinyDraggable({ handle: ".app_topBar" });
        jQuery("#settingApp").tinyDraggable({ handle: ".app_topBar" });
        var vw = jQuery(window).width();
        if (vw <= 1280) {
          $scope.change_to_small_screen_layout();
        } else {
          $scope.change_to_large_screen_layout();
        }
      };
      $scope.handle_jquery_events = function () {
        jQuery("#rightCollumn").on("click", function () {
          $scope.left_navigator_count = 0;
          $scope.right_navigator_count = 0;
          jQuery("#leftNavigator").animate(
            {
              left: -308,
            },
            400
          );
          jQuery("#rightNavigator").animate(
            {
              right: -318,
            },
            400
          );
          jQuery("#rightCollumn").animate(
            {
              "margin-left": 0,
            },
            400
          );
        });
        jQuery(window).on("resize", function () {
          var vw = jQuery(window).width();
          if (vw <= 1280) {
            $scope.change_to_small_screen_layout();
          } else {
            $scope.change_to_large_screen_layout();
          }
        });
        jQuery("#suboption_bgImage").on("click", function () {
          jQuery(".content_area_setting").hide();
          jQuery("#div_background_image").fadeIn(400);
        });
        jQuery("#suboption_appView").on("click", function () {
          jQuery(".content_area_setting").hide();
          jQuery("#div_setting_default").fadeIn(400);
        });
      };
      $scope.initiate_global_variables = function () {
        if (!$window.localStorage["cassandra_should_hide_login"]) {
          $window.localStorage["cassandra_should_hide_login"] = "no";
        }
        // $window.localStorage["cassandra_should_hide_login"] = "no";
        console.log($window.localStorage["cassandra_should_hide_login"]);
        if ($window.localStorage["cassandra_background_image_link"]) {
          $scope.custom_background = JSON.parse(
            $window.localStorage["cassandra_background_image_link"]
          );
        } else {
          $scope.custom_background = "background/win.png";
        }
        if ($window.localStorage["cassandra_background_images"]) {
          $scope.background_images = JSON.parse(
            $window.localStorage["cassandra_background_images"]
          );
        } else {
          $scope.background_images = [
            {
              name: "Canon",
              link: "background/canon.png",
              is_selected: false,
            },

            {
              name: "Valley",
              link: "background/valley.png",
              is_selected: false,
            },

            {
              name: "Forest",
              link: "background/forest.jpeg",
              is_selected: false,
            },
            {
              name: "Hill",
              link: "background/hill.png",
              is_selected: false,
            },
            {
              name: "Donate",
              link: "background/donate.png",
              is_selected: false,
            },

            {
              name: "Lubu",
              link: "background/lubu.jpg",
              is_selected: false,
            },
            {
              name: "Mountain",
              link: "background/mountain.jpg",
              is_selected: false,
            },
            {
              name: "Rocket",
              link: "background/rocket.jpg",
              is_selected: false,
            },
            {
              name: "Tower",
              link: "background/tower.png",
              is_selected: false,
            },
            {
              name: "Window",
              link: "background/win.png",
              is_selected: true,
            },
          ];
        }
        $scope.settings = [
          {
            name: "Window appearance",
            element_id: "option_winAppear",
            sub_options: [
              {
                name: "Background image",
                image: "images/options/image.png",
                element_id: "suboption_bgImage",
              },
              {
                name: "View mode",
                image: "images/options/view.png",
                element_id: "suboption_appView",
              },
              {
                name: "Widget design",
                image: "images/options/widget.png",
                element_id: "suboption_cardTrans",
              },
            ],
          },
          {
            name: "Detection algorithm",
            element_id: "option_detectAlgo",
            sub_options: [
              {
                name: "Algorithm design",
                image: "images/options/design.png",
                element_id: "suboption_algoDesign",
              },
            ],
          },
          {
            name: "Records managament",
            element_id: "option_recordMana",
            sub_options: [
              {
                name: "Automatic Sync",
                image: "images/options/backup.png",
                element_id: "suboption_autoSync",
              },
              {
                name: "Storage",
                image: "images/options/storage.png",
                element_id: "suboption_storage",
              },
            ],
          },
        ];
        $scope.connected_devices = [];
        $scope.left_navigator_count = 0;
        $scope.right_navigator_count = 0;
        $scope.loading_message = "Under processing. Please wait...";
        $scope.should_display_connected_devices = false;
        $scope.port_to_be_displayed_in_message_box;
        $scope.notifications = [
          {
            title: "Version 1.0 publised",
            sender: "Nguyen, Pham",
            action: {
              type: "redirect",
              link: "/personal",
              extra: "",
            },
          },
          {
            title: "New messages received",
            sender: "Hung, Le",
            action: {
              type: "redirect",
              link: "/messages",
              extra: "",
            },
          },
        ];
        $scope.doctors = [];
        $scope.devices = [];
        $scope.messages = [];
        $scope.chat_messages = [];
        $scope.currentMailType = "inbox";
        $scope.clickedMail = {
          title: "",
          fromAvarta: "",
          date: "",
          content: "",
          from: "",
        };
        $scope.newMails = [
          {
            title: "Spime Version 2.0 announcement",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyen.png",
            to: "Nguyen Pham",
            date: "14/12/2015",
            content:
              "Dear our treasured candidates,<br/>Spime Core Team is currently developing the second module of the website. We hope that we could make it in time in April 24th.<br/>If you find our project interesting please help us improve the products by participating in.<br/>Here are some requirements:<br/>     1.    Good at working independently<br/>     2.    Love Angular js and Css technique<br/>     3.    Willing to work without MONEY<br/>If you still want to help us accomplish our goal in spite of the hardship, we would be very pround to have you side by side as a core team member.<br/>Thank you very much for reading this letter. Spime team wishes you a new nice day of work.<br/>Khoi Nguyen",
          },
          {
            title: "Academic revise 12/2015",
            from: "Nguyen Anh",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/anh2.png",
            to: "Nguyen Pham",
            date: "11/12/2015",
            content:
              "Dear Nguyen,<br/>Please send me the revised version of your academic transcript. I need it for contacting your university.<br/>Thank you,<br/>Nguyen Anh",
          },
          {
            title: "Military Education",
            from: "Kieu Khanh",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/phuong2.png",
            to: "Nguyen Pham",
            date: "8/12/2015",
            content:
              "Hi Nguyen,<br/>Miss Hien announce that we should go top the Student OSA room to take our certification for completing military education.<br/>Best,<br/>Khanh",
          },
          {
            title: "Congratz on winning the Startup event",
            from: "Huy Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/huy2.png",
            to: "Nguyen Pham",
            date: "1/12/2015",
            content:
              "We win it !<br/>Will yopu consider celebrating? This time we gonna invite Miss An and Mr Trung for sure.<br/>Huy",
          },
          {
            title: "About Research 3A project",
            from: "Trung Le",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyenminhthanh.png",
            to: "Nguyen Pham",
            date: "28/11/2015",
            content:
              "Dear Nguyen,<br/>I would like you to complete the student research log for the Research 3A Project. Please work on it untill September 28th so that we could have time to revise.<br/>Best,<br/>",
          },
          {
            title: "Business Plan revised",
            from: "Thinh Nguyen",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyenphihung.png",
            to: "Nguyen Pham",
            date: "13/12/2015",
            content: "",
          },
          {
            title: "Pictures of the event",
            from: "Thu Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/thu2.png",
            to: "Nguyen Pham",
            date: "14/11/2015",
            content: "",
          },
          {
            title: "Group Work on Monday",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/trung2.png",
            to: "Nguyen Pham",
            date: "11/12/2015",
            content: "",
          },
        ];
        $scope.outMails = [
          {
            title: "Spime Version 2.0 announcement",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/nguyen.png",
            to: "Nguyen Pham",
            date: "14/12/2015",
            content:
              "Dear our treasured candidates,<br/>Spime Core Team is currently developing the second module of the website. We hope that we could make it in time in April 24th.<br/>If you find our project interesting please help us improve the products by participating in.<br/>Here are some requirements:<br/>     1.    Good at working independently<br/>     2.    Love Angular js and Css technique<br/>     3.    Willing to work without MONEY<br/>If you still want to help us accomplish our goal in spite of the hardship, we would be very pround to have you side by side as a core team member.<br/>Thank you very much for reading this letter. Spime team wishes you a new nice day of work.<br/>Khoi Nguyen",
          },
          {
            title: "Amato Gozila",
            from: "Nguyen Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/phuong2.png",
            to: "Nguyen Pham",
            date: "11/12/2015",
            content:
              "Dear Nguyen,<br/>Please send me the revised version of your academic transcript. I need it for contacting your university.<br/>Thank you,<br/>Nguyen Anh",
          },
          {
            title: "Children of The North",
            from: "Kieu Khanh",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/anh2.png",
            to: "Nguyen Pham",
            date: "8/12/2015",
            content:
              "Hi Nguyen,<br/>Miss Hien announce that we should go top the Student OSA room to take our certification for completing military education.<br/>Best,<br/>Khanh",
          },
          {
            title: "Hulu Hula",
            from: "Huy Pham",
            fromID: "BEBEIU13051",
            fromAvarta: "user/avarta/trung2.png",
            to: "Nguyen Pham",
            date: "1/12/2015",
            content:
              "We win it !<br/>Will yopu consider celebrating? This time we gonna invite Miss An and Mr Trung for sure.<br/>Huy",
          },
        ];
        $scope.ecg_data = [];
        $scope.file_content = [];
        $scope.record_name = "";
        $scope.record_comment = "";
        $scope.record_sampling_frequency = 100;
        $scope.plot_speed = 40;
        $scope.record_duration =
          Math.floor(
            ($scope.file_content.length / $scope.record_sampling_frequency) * 10
          ) / 10;
        $scope.record_date = new Date();
        $scope.ecg_bin = [];
        $scope.heartrate_bin = [];
        $scope.variability_bin = [];
        $scope.tmag_bin = [];
        $scope.stdeviation_bin = [];
        $scope.qrs_locs_bin = [];
        // FOR ANNOTATION GENERATOR
        $scope.heartrate_bin_ann = [];
        $scope.variability_bin_ann = [];
        $scope.tmag_bin_ann = [];
        $scope.stdeviation_bin_ann = [];
        $scope.qrs_locs_bin_ann = [];
        $scope.red_code = "#FF4081";
        // var orange_code = "#d17905";
        $scope.orange_code = "#FF9800";
        $scope.green_code = "#8BC34A";
        $scope.status_pool = [
          "Normal",
          "Brady",
          "Tarchy",
          "AF",
          "Arryth",
          "Ische",
          "Stroke",
          "Deadly",
        ];
        $scope.colors_pool = [
          $scope.green_code,
          $scope.orange_code,
          $scope.red_code,
        ];
        $scope.annotations = [];
        $scope.annotations_statistic = [];
        $scope.chat_messages = [];
        $scope.ann_normal = "rgb(17,168,171)";
        $scope.ann_danger = "rgb(226,75,101)";
        $scope.ann_caution = "rgb(252,177,80)";
        $scope.ann_deep_red = "#F44336";
        $scope.ann_red = "#FF4081";
        $scope.ann_orange = "	#ffb234";
        $scope.ann_yellow = "#ffd834";
        $scope.ann_green = "#9fc05a";
        $scope.ann_lightgreen = "#add633";
        $scope.ann_blue = "#0057e7";
        $scope.ann_human = "rgb(255,139,90)";
        $scope.statistics_count = [0, 0, 0];
        $scope.loading_message = "Processing the signal. Please wait...";
        $scope.timer = 0;
        $scope.selected_index = -1;
      };
      $scope.innitiate_global_functions = function () {
        $scope.cancel_all_timeouts_and_intervals = function () {
          if ($scope.hover_record_timeout) {
            $timeout.cancel($scope.hover_record_timeout);
            $scope.hover_record_timeout = null;
          }
          if ($scope.timer_interval) {
            $interval.cancel($scope.timer_interval);
            $scope.timer_interval = null;
          }
        };
        $scope.display_record_statistics = function (index) {
          $scope.timer = 1;
          $scope.timer_interval = $interval(function () {
            if ($scope.timer > 0) {
              $scope.timer += 1;
            }
            if ($scope.timer == 6) {
              if ($scope.selected_index >= 0) {
                if (index != $scope.selected_index) {
                  $scope.selected_record = $scope.records[index];
                  $scope.init_chart(
                    $scope.selected_record.statistics[0],
                    $scope.selected_record.statistics[1],
                    $scope.selected_record.statistics[2]
                  );
                  $scope.cancel_all_timeouts_and_intervals();
                  $scope.selected_index = index;
                }
              } else {
                $scope.selected_record = $scope.records[index];
                $scope.init_chart(
                  $scope.selected_record.statistics[0],
                  $scope.selected_record.statistics[1],
                  $scope.selected_record.statistics[2]
                );
                $scope.cancel_all_timeouts_and_intervals();
                $scope.selected_index = index;
              }
            }
          }, 160);
        };
        $scope.mouse_leave_this_record = function () {
          $scope.timer = 0;
          $scope.cancel_all_timeouts_and_intervals();
        };
        $scope.view_this_signal = function (record) {
          var index = $scope.records.indexOf(record);
          $window.localStorage["cassandra_command_lab_to_run_this_signal"] =
            JSON.stringify($scope.records[index]);
          $window.open("laboratory.html", "_blank", "width=1024,height=700");
          // $scope.socket.emit("command_app_to_open_laboratory_as_new_window");
        };
        $scope.analize_this_signal = function (record) {
          var index = $scope.records.indexOf(record);
          $window.localStorage[
            "cassandra_command_analysis_to_run_this_signal"
          ] = JSON.stringify($scope.records[index]);
          $window.open("analysis_2.html", "_blank", "width=1024,height=700");
          // $scope.socket.emit("command_app_to_open_analysis_as_new_window");
        };
        $scope.delete_this_record = function (index) {
          if (confirm("Delete record " + $scope.records[index].name + "?")) {
            jQuery("#page_loading").show();
            if (index == $scope.records.length - 1) {
              $scope.selected_record = {
                name: "No records hovered",
                statistics: [0, 0, 0],
              };
              $scope.init_chart(
                $scope.selected_record.statistics[0],
                $scope.selected_record.statistics[1],
                $scope.selected_record.statistics[2]
              );
            } else {
              $scope.selected_record = $scope.records[index + 1];
              $scope.init_chart(
                $scope.selected_record.statistics[0],
                $scope.selected_record.statistics[1],
                $scope.selected_record.statistics[2]
              );
            }

            $scope.cancel_all_timeouts_and_intervals();

            $scope.selected_index = index;

            $scope.record = $scope.records[index];
            var record_data_id = $scope.record.record_id;

            $window.localStorage.removeItem(record_data_id);

            console.log("Remove item: " + record_data_id);

            $scope.records.splice(index, 1);
            $window.localStorage["cassandra_records"] = JSON.stringify(
              $scope.records
            );

            jQuery("#page_loading").hide();

            $scope.cancel_custom_timeout();

            // $scope.update_my_records_to_local_storage();
          }
        };
        $scope.importPackageFromTextFile = function ($fileContent) {
          jQuery("#page_loading").show();
          $scope.custom_timeout = $timeout(function () {
            var fullPath = document.getElementById("file-upload").value;
            var filename = "";
            if (fullPath) {
              filename = fullPath.replace(/^.*?([^\\\/]*)$/, "$1");
              filename = filename.substring(0, filename.lastIndexOf("."));
            }
            var result = [];
            var lines = $fileContent.split("\n");
            for (var line = 2; line < lines.length - 1; line++) {
              values = lines[line].split(/[ ,;\t ]+/).filter(Boolean);
              if (values.length == 1) {
                result.push(values);
              } else {
                var number_of_leads = values.length;
                result.push(values[number_of_leads - 1]);
              }
            }
            $scope.file_content = "";
            var value_to_devine = dsp.find_max(result);
            for (var loop = 0; loop < result.length - 1; loop++) {
              result[loop] =
                Math.floor((result[loop] / value_to_devine) * 1000) / 1000;
              $scope.file_content += result[loop] + "\n";
            }
            result[result.length - 1] =
              Math.floor((result[result.length - 1] / value_to_devine) * 1000) /
              1000;
            $scope.file_content += result[result.length - 1];
            $scope.ecg_data = result;
            $scope.record_name = filename;
            $scope.record_duration =
              Math.floor(
                ($scope.ecg_data.length / $scope.record_sampling_frequency) * 10
              ) / 10;
            jQuery("#page_loading").hide();
            $scope.cancel_custom_timeout();
          }, 200);
        };
        $scope.update_duration = function () {
          $scope.record_duration =
            Math.floor(
              ($scope.ecg_data.length / $scope.record_sampling_frequency) * 10
            ) / 10;
        };
        $scope.update_ecg_data_and_duration = function () {
          var result = [];
          var lines = $scope.file_content.split("\n");
          for (var line = 2; line < lines.length; line++) {
            values = lines[line].split(/[ ,;\t ]+/).filter(Boolean);
            if (values.length == 1) {
              result.push(values);
            } else {
              var number_of_leads = values.length;
              result.push(values[number_of_leads - 1]);
            }
          }
          $scope.file_content = "";
          for (var loop = 0; loop < result.length - 1; loop++) {
            $scope.file_content += result[loop] + "\n";
          }
          $scope.file_content += result[result.length - 1];
          $scope.ecg_data = result;
          $scope.record_duration =
            Math.floor(
              ($scope.ecg_data.length / $scope.record_sampling_frequency) * 10
            ) / 10;
        };
        $scope.open_popup_upload_record = function () {
          $scope.loading_message = "Processing the signal. Please wait...";
          jQuery("#upload_record_popup").show();
          jQuery("#upload_record_popup > form > .div_small_popup").animate(
            {
              top: 100,
              opacity: 1,
            },
            400
          );
        };
        $scope.close_popup_upload_record = function () {
          $scope.file_content = [];
          $scope.record_name = "";
          $scope.record_comment = "";
          $scope.record_sampling_frequency = 100;
          $scope.record_duration =
            Math.floor(
              ($scope.file_content.length / $scope.record_sampling_frequency) *
                10
            ) / 10;
          $scope.record_date = new Date();
          $scope.custom_timeout = $timeout(function () {
            jQuery("#upload_record_popup > form > .div_small_popup").animate(
              {
                top: 140,
                opacity: 0,
              },
              400,
              function () {
                jQuery("#upload_record_popup").hide();
              }
            );
            $scope.cancel_custom_timeout();
          }, 160);
        };
        $scope.save_this_record = function () {
          $scope.loading_message = "Processing the signal. Please wait...";
          jQuery("#page_loading").show();
          $scope.custom_timeout = $timeout(function () {
            $scope.ecg_bin = $scope.ecg_data;
            $scope.down_sampling_value = Math.floor(
              $scope.record_sampling_frequency / $scope.plot_speed
            );
            // console.log($scope.down_sampling_value);
            for (i = 0; i < $scope.ecg_bin.length; i++) {
              $scope.ecg_bin[i] = $scope.ecg_bin[i] * 1000;
            }
            var value = dsp.cal_mean($scope.ecg_bin);
            for (i = 0; i < $scope.ecg_bin.length; i++) {
              $scope.ecg_bin[i] = $scope.ecg_bin[i] - value;
            }
            $scope.ecg_bin = dsp.noise_removal_using_low_pass_filter(
              $scope.ecg_bin
            );
            $scope.ecg_bin = dsp.smooth_signal_with_moving_avarage(
              4,
              $scope.ecg_bin
            );
            $scope.ecg_bin = dsp.down_sampling(
              $scope.down_sampling_value,
              $scope.ecg_bin
            );
            $scope.ecg_bin = dsp.baseline_remove_using_moving_average(
              $scope.ecg_bin
            );
            $scope.generate_annotations_for_this_segment();
            $scope.new_record = {
              name: $scope.record_name,
              date: $scope.record_date,
              uploaded_by: $scope.userInfo.email + "-desktop",
              record_id:
                "record__" +
                Math.floor(Math.random() * 1000000) +
                "__" +
                $scope.record_name.split(" ").join("_") +
                "__" +
                $scope.record_comment.split(" ").join("_"),
              data_link:
                $scope.local_server.link +
                "\\bin\\saved-records\\" +
                $scope.record_name.split(" ").join("_") +
                ".txt",
              description: $scope.record_comment,
              clinical_symptoms: {
                chest_pain: false,
                shortness_of_breath: false,
                severe_sweating: false,
                dizziness: false,
              },
              statistics: $scope.transform_statistics($scope.statistics_count),
              send_to_doctor: false,
              user_info: JSON.parse($window.localStorage["cassandra_userInfo"]),
            };
            $scope.record_data = {
              record_id: $scope.new_record.record_id,
              sampling_frequency: $scope.record_sampling_frequency,
              data: $scope.ecg_data,
              user_info: JSON.parse($window.localStorage["cassandra_userInfo"]),
              // annotations: $scope.annotations,
            };
            $scope.records.push($scope.new_record);
            $window.localStorage["cassandra_records"] = JSON.stringify(
              $scope.records
            );
            $window.localStorage[$scope.record_data.record_id] = JSON.stringify(
              $scope.record_data
            );
            alert("Record uploaded successfully");
            jQuery("#page_loading").hide();
            $scope.cancel_custom_timeout();
            $scope.close_popup_upload_record();

            var package_to_database_server = {
              record_info: $scope.new_record,
              record_data: $scope.record_data,
              user_info: $scope.userInfo,
            };
            // $scope.heroku_socket.emit("save_this_record_directly_to_database_server", package_to_database_server);
          }, 1600);
        };
        $scope.transform_statistics = function (array) {
          var total = array[0] + array[1] + array[2];
          array[0] = Math.floor((array[0] / total) * 100);
          array[1] = Math.floor((array[1] / total) * 100);
          array[2] = 100 - array[0] - array[1];
          return array;
        };
        $scope.init_chart = function (normal, risk, danger) {
          var chart = new Chartist.Pie(
            ".ct-chart",
            {
              series: [normal, risk, danger],
              labels: ["Normal", "Risk", "Danger"],
            },
            {
              donut: true,
              donutWidth: 56,
              startAngle: 340,
              showLabel: false,
            }
          );
          chart.on("draw", function (data) {
            if (data.type === "slice") {
              // Get the total path length in order to use for dash array animation
              var pathLength = data.element._node.getTotalLength();

              // Set a dasharray that matches the path length as prerequisite to animate dashoffset
              data.element.attr({
                "stroke-dasharray": pathLength + "px " + pathLength + "px",
              });

              // Create animation definition while also assigning an ID to the animation for later sync usage
              var animationDefinition = {
                "stroke-dashoffset": {
                  id: "anim" + data.index,
                  dur: 900,
                  from: -pathLength + "px",
                  to: "0px",
                  easing: Chartist.Svg.Easing.easeOutQuint,
                  // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                  fill: "freeze",
                },
              };

              // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
              if (data.index !== 0) {
                animationDefinition["stroke-dashoffset"].begin =
                  "anim" + (data.index - 1) + ".end";
              }

              // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
              data.element.attr({
                "stroke-dashoffset": -pathLength + "px",
              });

              // We can't use guided mode as the animations need to rely on setting begin manually
              // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
              data.element.animate(animationDefinition, false);
            }
          });

          // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
          chart.on("created", function () {
            if (window.__anim21278907124) {
              clearTimeout(window.__anim21278907124);
              window.__anim21278907124 = null;
            }
          });
        };

        $scope.generate_annotation_for_this_beat = function (
          hr,
          hrv,
          std,
          tp,
          loc,
          beat,
          left
        ) {
          var obj = {
            text: null,
            color: null,
            tooltip: null,
            qrs_loc: loc,
            beat_num: beat,
            left: left,
          };
          if (std >= 35 && tp >= 80) {
            // $scope.health_condition = 2;
            $scope.statistics_count[2] += 1;
            obj.text = "ST+";
            obj.color = $scope.ann_danger;
            obj.tooltip =
              "<b>ST Elevation</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }
          if (std <= -20 && tp <= -20) {
            // $scope.health_condition = 2;
            $scope.statistics_count[2] += 1;
            obj.text = "ST-";
            obj.color = $scope.ann_danger;
            obj.tooltip =
              "<b>ST Depression</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }
          if (tp >= 160 && hr <= 70 && std < 35) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.text = "PVC";
            obj.color = $scope.ann_human;
            obj.tooltip =
              "<b>Premature Ventricular Complex</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          } else {
            if (hrv >= 20 && hr <= 70 && tp < 0) {
              // $scope.health_condition = 1;
              $scope.statistics_count[1] += 1;
              obj.text = "PVC";
              obj.color = $scope.ann_human;
              obj.tooltip =
                "<b>Premature Ventricular Complex</b><br/><ul><li>HR:  " +
                hr +
                "</li><li>T:  " +
                tp +
                "%</li><li>STD:  " +
                std +
                "%</li></ul>";
              return obj;
            }
          }
          if (hrv >= 10 && (hr >= 120 || hr <= 70)) {
            // $scope.health_condition = 2;
            $scope.statistics_count[1] += 1;
            obj.text = "ARR";
            obj.color = $scope.ann_caution;
            obj.tooltip =
              "<b>Arrythmia</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }

          if (tp <= -5) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.text = "T-";
            obj.color = $scope.ann_caution;
            obj.tooltip =
              "<b>T Inverted</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }

          if (tp >= 100) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.text = "T+";
            obj.color = $scope.ann_caution;
            obj.tooltip =
              "<b>T Peaked</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }

          if (std <= -8 || std >= 20) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.color = $scope.ann_red;
            if (std <= -8) {
              obj.text = "SD-";
              obj.tooltip =
                "<b>Negative ST Deviation</b><br/><ul><li>HR:  " +
                hr +
                "</li><li>T:  " +
                tp +
                "%</li><li>STD:  " +
                std +
                "%</li></ul>";
            } else {
              obj.text = "SD+";
              obj.tooltip =
                "<b>Positive ST Deviation</b><br/><ul><li>HR:  " +
                hr +
                "</li><li>T:  " +
                tp +
                "%</li><li>STD:  " +
                std +
                "%</li></ul>";
            }
            // obj.text = "STD";
            // obj.tooltip = "ST Deviation";
            return obj;
          }

          if (hr >= 140) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.text = "TAR";
            obj.color = $scope.ann_human;
            obj.tooltip =
              "<b>Tarchycardia</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }

          if (hr <= 50) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.text = "BRA";
            obj.color = $scope.ann_human;
            obj.tooltip =
              "<b>Bradycardia</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }
          if (tp >= -5 && tp <= 5) {
            // $scope.health_condition = 1;
            $scope.statistics_count[1] += 1;
            obj.text = "T0";
            obj.color = $scope.ann_caution;
            obj.tooltip =
              "<b>T Absence</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }
          // $scope.health_condition = 0;
          if (
            tp > 5 &&
            hr > 40 &&
            hr < 140 &&
            hrv < 10 &&
            std > -8 &&
            std < 20
          ) {
            // $scope.health_condition = 1;
            $scope.statistics_count[0] += 1;
            obj.text = "N";
            obj.color = $scope.ann_normal;
            obj.tooltip =
              "<b>Normal</b><br/><ul><li>HR:  " +
              hr +
              "</li><li>T:  " +
              tp +
              "%</li><li>STD:  " +
              std +
              "%</li></ul>";
            return obj;
          }
          $scope.statistics_count[0] += 1;
          obj.text = "M";
          obj.color = $scope.ann_green;
          obj.tooltip =
            "<b>Missed Beat</b><br/><ul><li>HR:  " +
            hr +
            "</li><li>T:  " +
            tp +
            "%</li><li>STD:  " +
            std +
            "%</li></ul>";
          return obj;
        };
        $scope.generate_annotations_for_this_segment = function () {
          var qrs_locs = dsp.qrs_detect(40, $scope.ecg_bin);
          $scope.qrs_locs_bin_ann = qrs_locs;
          var hr_bin = dsp.calculate_heart_rates(40, $scope.ecg_bin, qrs_locs);
          var hrv_bin = [];
          var t_result = dsp.t_peaks_detect(40, $scope.ecg_bin, qrs_locs);
          var tp_bin = t_result[0];
          var tlocs = t_result[1];
          var std_bin = dsp.std_detect(40, $scope.ecg_bin, qrs_locs, tlocs);
          for (var loop = 0; loop < hr_bin.length; loop++) {
            var segment = [];
            var span = 3;
            for (var ind = -1; ind < span - 1; ind++) {
              if (hr_bin[loop + ind]) {
                segment.push(hr_bin[loop + ind]);
              } else {
                segment.push(hr_bin[loop + ind - span]);
              }
            }
            hrv_bin.push(dsp.cal_std(segment));
          }
          $scope.heartrate_bin_ann = hr_bin;
          $scope.variability_bin_ann = hrv_bin;
          $scope.tmag_bin_ann = tp_bin;
          $scope.stdeviation_bin_ann = std_bin;
          for (var beat_ind = 0; beat_ind < hr_bin.length; beat_ind++) {
            var hrv = hrv_bin[beat_ind];
            var hr = hr_bin[beat_ind];
            var std = std_bin[beat_ind];
            var tp = tp_bin[beat_ind];
            var margin_left_value =
              ((qrs_locs[beat_ind] - 2) / $scope.ecg_bin.length) *
                ((jQuery("#ecg_chart_container").width() *
                  $scope.window_percentage) /
                  100 +
                  60) -
              ((qrs_locs[beat_ind] - 2) / $scope.ecg_bin.length) * 66;
            var result = $scope.generate_annotation_for_this_beat(
              hr,
              hrv,
              std,
              tp,
              qrs_locs,
              beat_ind,
              margin_left_value
            );
            $scope.annotations.push(result);
          }
          var len = $scope.annotations.length;
          var last_ann = {
            text: $scope.annotations[len - 1].text,
            color: $scope.annotations[len - 1].color,
            tooltip: $scope.annotations[len - 1].tooltip,
            qrs_loc:
              2 * $scope.annotations[len - 1].qrs_loc -
              $scope.annotations[len - 2].qrs_loc,
            beat_num: $scope.annotations[len - 1].beat_num + 1,
            left:
              2 * $scope.annotations[len - 1].left -
              $scope.annotations[len - 2].left,
          };
          $scope.annotations.push(last_ann);
          console.log(
            "qrs:" +
              qrs_locs.length +
              "-hr:" +
              hr_bin.length +
              "-ann:" +
              $scope.annotations.length
          );
        };
        $scope.cancel_custom_timeout = function () {
          if ($scope.custom_timeout) {
            $timeout.cancel($scope.custom_timeout);
            $scope.custom_timeout = null;
          }
        };
      };
      $scope.establish_server_connections();
      $scope.initiate_global_variables();
      $scope.configure_on_pageload();
      $scope.innit_login();
      $scope.handle_jquery_events();
      $scope.innitiate_global_functions();
      jQuery("#upload_record_popup").hide();
      jQuery("#smallPopup_uploadRecord").tinyDraggable({ handle: ".header" });

      $scope.custom_timeout = $timeout(function () {
        if ($window.localStorage["cassandra_records"]) {
          $scope.records = JSON.parse(
            $window.localStorage["cassandra_records"]
          );
          jQuery("#loading_records_spinner").hide();
        } else {
          $scope.records = [
            {
              name: "Normal_and_healthy_ECG",
              date: "2017-12-07T04:49:52.045Z",
              uploaded_by: "Nguyen Pham-desktop",
              record_id:
                "record__615639__Normal_and_healthy_ECG__Hover,_Run_analysis_and_export_report_this_record_for_Demo_!",
              data_link:
                "http://35.197.159.87:8000\\bin\\saved-records\\Normal_and_healthy_ECG.txt",
              description:
                "Hover this, then run analysis and export report to see demo !",
              clinical_symptoms: {
                chest_pain: false,
                shortness_of_breath: false,
                severe_sweating: false,
                dizziness: false,
              },
              statistics: [4, 73, 23],
              send_to_doctor: false,
              user_info: {
                email: "Nguyen Pham",
                password: "123",
                user_id: "663-161-8152",
              },
            },
          ];
          $scope.record_data = {
            record_id:
              "record__615639__Normal_and_healthy_ECG__Hover,_Run_analysis_and_export_report_this_record_for_Demo_!",
            sampling_frequency: "80",
            data: [
              79.52381947346424, -65.47618052653576, 49.52381947346424,
              -63.47618052653576, 37.52381947346424, -43.47618052653576,
              -14.476180526535757, 10.523819473464243, -59.47618052653576,
              214.52381947346424, 403.52381947346424, 159.52381947346424,
              -313.47618052653576, -146.47618052653576, -123.47618052653576,
              53.52381947346424, -58.47618052653576, 80.52381947346424,
              -50.47618052653576, 77.52381947346424, -37.47618052653576,
              77.52381947346424, -2.4761805265357566, 24.523819473464243,
              89.52381947346424, -9.476180526535757, 132.52381947346424,
              11.523819473464243, 14.523819473464243, 173.52381947346424,
              -1.4761805265357566, 72.52381947346424, -28.476180526535757,
              -92.47618052653576, -96.47618052653576, -163.47618052653576,
              -110.47618052653576, -183.47618052653576, -94.47618052653576,
              -167.47618052653576, -85.47618052653576, -107.47618052653576,
              -113.47618052653576, -62.47618052653576, -132.47618052653576,
              -33.47618052653576, -127.47618052653576, -20.476180526535757,
              -120.47618052653576, -18.476180526535757, -113.47618052653576,
              -22.476180526535757, -79.47618052653576, -39.47618052653576,
              -68.47618052653576, -55.47618052653576, -18.476180526535757,
              -100.47618052653576, 8.523819473464243, -94.47618052653576,
              11.523819473464243, -83.47618052653576, 15.523819473464243,
              -106.47618052653576, 5.523819473464243, -91.47618052653576,
              8.523819473464243, -59.47618052653576, -54.47618052653576,
              169.52381947346424, 392.52381947346424, 293.52381947346424,
              -313.47618052653576, -201.47618052653576, -144.47618052653576,
              23.523819473464243, -55.47618052653576, 28.523819473464243,
              24.523819473464243, -15.476180526535757, 59.52381947346424,
              -33.47618052653576, 95.52381947346424, -33.47618052653576,
              124.52381947346424, -19.476180526535757, 155.52381947346424,
              6.523819473464243, 184.52381947346424, 54.52381947346424,
              162.52381947346424, 86.52381947346424, 34.52381947346424,
              -0.4761805265357566, -118.47618052653576, -78.47618052653576,
              -171.47618052653576, -98.47618052653576, -180.47618052653576,
              -88.47618052653576, -170.47618052653576, -87.47618052653576,
              -136.47618052653576, -72.47618052653576, -61.47618052653576,
              -113.47618052653576, -37.47618052653576, -110.47618052653576,
              -26.476180526535757, -115.47618052653576, -15.476180526535757,
              -114.47618052653576, -19.476180526535757, -96.47618052653576,
              -23.476180526535757, -84.47618052653576, -26.476180526535757,
              -85.47618052653576, -39.47618052653576, -67.47618052653576,
              -37.47618052653576, -27.476180526535757, -76.47618052653576,
              27.523819473464243, -59.47618052653576, -6.476180526535757,
              -97.47618052653576, 21.523819473464243, -24.476180526535757,
              -74.47618052653576, 55.52381947346424, 589.5238194734643,
              -75.47618052653576, -266.47618052653576, -194.47618052653576,
              -31.476180526535757, -62.47618052653576, 19.523819473464243,
              -24.476180526535757, 7.523819473464243, 49.52381947346424,
              -45.47618052653576, 77.52381947346424, -48.47618052653576,
              111.52381947346424, -22.476180526535757, 77.52381947346424,
              107.52381947346424, 60.52381947346424, 153.52381947346424,
              47.52381947346424, 166.52381947346424, -2.4761805265357566,
              75.52381947346424, -91.47618052653576, -50.47618052653576,
              -162.47618052653576, -92.47618052653576, -145.47618052653576,
              -119.47618052653576, -107.47618052653576, -137.47618052653576,
              -65.47618052653576, -139.47618052653576, -40.47618052653576,
              -130.47618052653576, -43.47618052653576, -130.47618052653576,
              -28.476180526535757, -85.47618052653576, -65.47618052653576,
              -45.47618052653576, -88.47618052653576, -19.476180526535757,
              -106.47618052653576, -0.4761805265357566, -105.47618052653576,
              12.523819473464243, -100.47618052653576, 20.523819473464243,
              -83.47618052653576, -84.47618052653576, 25.523819473464243,
              -74.47618052653576, 33.52381947346424, -71.47618052653576,
              82.52381947346424, -65.47618052653576, 47.52381947346424,
              -44.47618052653576, -11.476180526535757, -32.47618052653576,
              2.5238194734642434, -76.47618052653576, 101.52381947346424,
              245.52381947346424, 537.5238194734643, -259.47618052653576,
              -185.47618052653576, -127.47618052653576, 7.523819473464243,
              -59.47618052653576, 25.523819473464243, -37.47618052653576,
              40.52381947346424, -31.476180526535757, 25.523819473464243,
              40.52381947346424, -18.476180526535757, 75.52381947346424,
              -36.47618052653576, 144.52381947346424, -9.476180526535757,
              166.52381947346424, 21.523819473464243, 154.52381947346424,
              34.52381947346424, 112.52381947346424, 37.52381947346424,
              -61.47618052653576, -59.47618052653576, -159.47618052653576,
              -83.47618052653576, -175.47618052653576, -84.47618052653576,
              -167.47618052653576, -76.47618052653576, -141.47618052653576,
              -65.47618052653576, -109.47618052653576, -87.47618052653576,
              -67.47618052653576, -117.47618052653576, -30.476180526535757,
              -107.47618052653576, -14.476180526535757, -115.47618052653576,
              -14.476180526535757, -107.47618052653576, -0.4761805265357566,
              -101.47618052653576, 3.5238194734642434, -94.47618052653576,
              -4.476180526535757, -83.47618052653576, -1.4761805265357566,
              -83.47618052653576, -7.476180526535757, -68.47618052653576,
              -24.476180526535757, -48.47618052653576, -28.476180526535757,
              12.523819473464243, -80.47618052653576, 71.52381947346424,
              -67.47618052653576, 43.52381947346424, -58.47618052653576,
              -31.476180526535757, -44.47618052653576, -28.476180526535757,
              -24.476180526535757, -39.47618052653576, -14.476180526535757,
              27.523819473464243, 512.5238194734643, 88.52381947346424,
              -231.47618052653576, -193.47618052653576, -35.47618052653576,
              -33.47618052653576, 25.523819473464243, -13.476180526535757,
              12.523819473464243, 42.52381947346424, -10.476180526535757,
              86.52381947346424, -45.47618052653576, 115.52381947346424,
              -32.47618052653576, 134.52381947346424, -4.476180526535757,
              164.52381947346424, 53.52381947346424, 46.52381947346424,
              167.52381947346424, -10.476180526535757, 123.52381947346424,
              -80.47618052653576, -46.47618052653576, -128.47618052653576,
              -126.47618052653576, -119.47618052653576, -154.47618052653576,
              -85.47618052653576, -163.47618052653576, -58.47618052653576,
              -143.47618052653576, -49.47618052653576, -128.47618052653576,
              -33.47618052653576, -87.47618052653576, -62.47618052653576,
              -61.47618052653576, -83.47618052653576, -28.476180526535757,
              -94.47618052653576, -20.476180526535757, -94.47618052653576,
              -0.4761805265357566, -101.47618052653576, 12.523819473464243,
              -93.47618052653576, 23.523819473464243, -94.47618052653576,
              19.523819473464243, -44.47618052653576, -45.47618052653576,
              14.523819473464243, -76.47618052653576, 42.52381947346424,
              -84.47618052653576, 53.52381947346424, -53.47618052653576,
              41.52381947346424, -23.476180526535757, -17.476180526535757,
              -35.47618052653576, -41.47618052653576, 15.523819473464243,
              -80.47618052653576, 46.52381947346424, -54.47618052653576,
              368.52381947346424, 499.52381947346424, -113.47618052653576,
              -296.47618052653576, -139.47618052653576, -9.476180526535757,
              -61.47618052653576, 90.52381947346424, -50.47618052653576,
              98.52381947346424, -23.476180526535757, 88.52381947346424,
              19.523819473464243, 72.52381947346424, 58.52381947346424,
              64.52381947346424, 79.52381947346424, 95.52381947346424,
              125.52381947346424, -11.476180526535757, 114.52381947346424,
              28.523819473464243, 114.52381947346424, 53.52381947346424,
              103.52381947346424, 134.52381947346424, 99.52381947346424,
              180.52381947346424, 69.52381947346424, 220.52381947346424,
              21.523819473464243, 158.52381947346424, -52.47618052653576,
              -14.476180526535757, -119.47618052653576, -76.47618052653576,
              -123.47618052653576, -97.47618052653576, -96.47618052653576,
              -107.47618052653576, -55.47618052653576, -123.47618052653576,
              -33.47618052653576, -114.47618052653576, -10.476180526535757,
              -105.47618052653576, 3.5238194734642434, -97.47618052653576,
              1.5238194734642434, -84.47618052653576, 3.5238194734642434,
              -63.47618052653576, -31.476180526535757, -32.47618052653576,
              -37.47618052653576, -14.476180526535757, -66.47618052653576,
              18.523819473464243, -79.47618052653576, 54.52381947346424,
              -67.47618052653576, 84.52381947346424, -53.47618052653576,
              62.52381947346424, -48.47618052653576, 42.52381947346424,
              -45.47618052653576, 10.523819473464243, -23.476180526535757,
              -7.476180526535757, -1.4761805265357566, 163.52381947346424,
              606.5238194734643, 154.52381947346424, -248.47618052653576,
              -231.47618052653576, -36.47618052653576, -66.47618052653576,
              101.52381947346424, -37.47618052653576, 128.52381947346424,
              -13.476180526535757, 124.52381947346424, 16.523819473464243,
              112.52381947346424, 47.52381947346424, 110.52381947346424,
              94.52381947346424, 97.52381947346424, 153.52381947346424,
              92.52381947346424, 192.52381947346424, 71.52381947346424,
              218.52381947346424, 27.523819473464243, 147.52381947346424,
              -65.47618052653576, -6.476180526535757, -137.47618052653576,
              -65.47618052653576, -161.47618052653576, -76.47618052653576,
              -123.47618052653576, -84.47618052653576, -85.47618052653576,
              -79.47618052653576, -65.47618052653576, -91.47618052653576,
              -22.476180526535757, -110.47618052653576, 1.5238194734642434,
              -98.47618052653576, 2.5238194734642434, -85.47618052653576,
              -14.476180526535757, -54.47618052653576, -27.476180526535757,
              -30.476180526535757, -46.47618052653576, -14.476180526535757,
              -66.47618052653576, 25.523819473464243, -76.47618052653576,
              47.52381947346424, -72.47618052653576, 77.52381947346424,
              -57.47618052653576, 80.52381947346424, -71.47618052653576,
              47.52381947346424, -61.47618052653576, 34.52381947346424,
              -46.47618052653576, 19.523819473464243, -33.47618052653576,
              19.523819473464243, 367.52381947346424, 473.52381947346424,
              -135.47618052653576, -285.47618052653576, -63.47618052653576,
              -81.47618052653576, 82.52381947346424, -44.47618052653576,
              107.52381947346424, -23.476180526535757, 114.52381947346424,
              -5.476180526535757, 103.52381947346424, 31.523819473464243,
              90.52381947346424, 79.52381947346424, 36.52381947346424,
              158.52381947346424, 29.523819473464243, 220.52381947346424,
              36.52381947346424, 224.52381947346424, 25.523819473464243,
              166.52381947346424, -32.47618052653576, -5.476180526535757,
              -97.47618052653576, -96.47618052653576, -97.47618052653576,
              -114.47618052653576, -91.47618052653576, -128.47618052653576,
              -59.47618052653576, -128.47618052653576, -37.47618052653576,
              -118.47618052653576, -18.476180526535757, -111.47618052653576,
              -4.476180526535757, -100.47618052653576, 3.5238194734642434,
              -87.47618052653576, -4.476180526535757, -65.47618052653576,
              -24.476180526535757, -45.47618052653576, -20.476180526535757,
              -49.47618052653576, 37.52381947346424, -31.476180526535757,
              -17.476180526535757, -2.4761805265357566, -46.47618052653576,
              38.52381947346424, -71.47618052653576, 51.52381947346424,
              -79.47618052653576, 259.52381947346424, 477.52381947346424,
              212.52381947346424, -276.47618052653576, -124.47618052653576,
              -58.47618052653576, 2.5238194734642434, 33.52381947346424,
              -26.476180526535757, 79.52381947346424, -32.47618052653576,
              101.52381947346424, -35.47618052653576, 127.52381947346424,
              -24.476180526535757, 146.52381947346424, 1.5238194734642434,
              164.52381947346424, 66.52381947346424, 168.52381947346424,
              111.52381947346424, 144.52381947346424, 141.52381947346424,
              75.52381947346424, 94.52381947346424, -46.47618052653576,
              -33.47618052653576, -136.47618052653576, -74.47618052653576,
              -163.47618052653576, -71.47618052653576, -162.47618052653576,
              -58.47618052653576, -141.47618052653576, -40.47618052653576,
              -119.47618052653576, -28.476180526535757, -96.47618052653576,
              -26.476180526535757, -58.47618052653576, -33.47618052653576,
              -44.47618052653576, -50.47618052653576, -22.476180526535757,
              -70.47618052653576, 2.5238194734642434, -94.47618052653576,
              27.523819473464243, -89.47618052653576, 25.523819473464243,
              -75.47618052653576, -7.476180526535757, -15.476180526535757,
              -44.47618052653576, 16.523819473464243, -41.47618052653576,
              42.52381947346424, -62.47618052653576, 42.52381947346424,
              -79.47618052653576, 47.52381947346424, -72.47618052653576,
              40.52381947346424, -54.47618052653576, 99.52381947346424,
              315.52381947346424, 598.5238194734643, -130.47618052653576,
              -265.47618052653576, -98.47618052653576, -65.47618052653576,
              73.52381947346424, -45.47618052653576, 125.52381947346424,
              -18.476180526535757, 127.52381947346424, -4.476180526535757,
              116.52381947346424, 33.52381947346424, 92.52381947346424,
              121.52381947346424, 64.52381947346424, 177.52381947346424,
              51.52381947346424, 241.52381947346424, 62.52381947346424,
              250.52381947346424, 46.52381947346424, 172.52381947346424,
              -37.47618052653576, -10.476180526535757, -98.47618052653576,
              -104.47618052653576, -113.47618052653576, -120.47618052653576,
              -91.47618052653576, -137.47618052653576, -52.47618052653576,
              -135.47618052653576, -30.476180526535757, -118.47618052653576,
              -11.476180526535757, -101.47618052653576, -1.4761805265357566,
              -70.47618052653576, -23.476180526535757, -50.47618052653576,
              -36.47618052653576, -28.476180526535757, -70.47618052653576,
              7.523819473464243, -76.47618052653576, 12.523819473464243,
              -83.47618052653576, 37.52381947346424, -80.47618052653576,
              54.52381947346424, -72.47618052653576, 68.52381947346424,
              -46.47618052653576, 51.52381947346424, -41.47618052653576,
              10.523819473464243, -18.476180526535757, -26.476180526535757,
              18.523819473464243, -67.47618052653576, 51.52381947346424,
              -48.47618052653576, 366.52381947346424, 498.52381947346424,
              75.52381947346424, -323.47618052653576, -130.47618052653576,
              -100.47618052653576, 71.52381947346424, -23.476180526535757,
              67.52381947346424, 24.523819473464243, 43.52381947346424,
              56.52381947346424, 34.52381947346424, 95.52381947346424,
              21.523819473464243, 132.52381947346424, 15.523819473464243,
              186.52381947346424, 23.523819473464243, 233.52381947346424,
              72.52381947346424, 231.52381947346424, 72.52381947346424,
              177.52381947346424, 27.523819473464243, -20.476180526535757,
              -65.47618052653576, -132.47618052653576, -74.47618052653576,
              -165.47618052653576, -66.47618052653576, -154.47618052653576,
              -50.47618052653576, -131.47618052653576, -37.47618052653576,
              -106.47618052653576, -37.47618052653576, -75.47618052653576,
              -40.47618052653576, -53.47618052653576, -48.47618052653576,
              -26.476180526535757, -58.47618052653576, -26.476180526535757,
              -68.47618052653576, 5.523819473464243, -81.47618052653576,
              19.523819473464243, -85.47618052653576, 33.52381947346424,
              -80.47618052653576, 43.52381947346424, -71.47618052653576,
              38.52381947346424, -37.47618052653576, -24.476180526535757,
              31.523819473464243, -28.476180526535757, 62.52381947346424,
              -50.47618052653576, 58.52381947346424, -74.47618052653576,
              54.52381947346424, -72.47618052653576, 55.52381947346424,
              -62.47618052653576, 42.52381947346424, 141.52381947346424,
              579.5238194734643, 154.52381947346424, -253.47618052653576,
              -153.47618052653576, -79.47618052653576, 68.52381947346424,
              -61.47618052653576, 103.52381947346424, -37.47618052653576,
              114.52381947346424, -19.476180526535757, 97.52381947346424,
              7.523819473464243, 94.52381947346424, 37.52381947346424,
              90.52381947346424, 108.52381947346424, 77.52381947346424,
              175.52381947346424, 59.52381947346424, 227.52381947346424,
              32.52381947346424, 201.52381947346424, -24.476180526535757,
              59.52381947346424, -105.47618052653576, -55.47618052653576,
              -126.47618052653576, -111.47618052653576, -96.47618052653576,
              -126.47618052653576, -72.47618052653576, -131.47618052653576,
              -33.47618052653576, -122.47618052653576, -26.476180526535757,
              -111.47618052653576, -2.4761805265357566, -94.47618052653576,
              -1.4761805265357566, -75.47618052653576, -9.476180526535757,
              -44.47618052653576, -20.476180526535757, -39.47618052653576,
              -54.47618052653576, -10.476180526535757, -87.47618052653576,
              19.523819473464243, -87.47618052653576, 37.52381947346424,
              -84.47618052653576, 43.52381947346424, -75.47618052653576,
              47.52381947346424, -65.47618052653576, 36.52381947346424,
              -44.47618052653576, 55.52381947346424, -19.476180526535757,
              -17.476180526535757, 21.523819473464243, -57.47618052653576,
              24.523819473464243, -70.47618052653576, 42.52381947346424,
              -75.47618052653576, 82.52381947346424, 129.52381947346424,
              644.5238194734643, -85.47618052653576, -205.47618052653576,
              -153.47618052653576, -1.4761805265357566, -36.47618052653576,
              36.52381947346424, 5.523819473464243, 29.523819473464243,
              43.52381947346424, 3.5238194734642434, 84.52381947346424,
              -22.476180526535757, 99.52381947346424, -17.476180526535757,
              138.52381947346424, -7.476180526535757, 194.52381947346424,
              33.52381947346424, 214.52381947346424, 62.52381947346424,
              169.52381947346424, 111.52381947346424, 67.52381947346424,
              -19.476180526535757, -58.47618052653576, -83.47618052653576,
              -126.47618052653576, -92.47618052653576, -146.47618052653576,
              -74.47618052653576, -146.47618052653576, -52.47618052653576,
              -137.47618052653576, -33.47618052653576, -122.47618052653576,
              -17.476180526535757, -106.47618052653576, -5.476180526535757,
              -93.47618052653576, -13.476180526535757, -72.47618052653576,
              -24.476180526535757, -50.47618052653576, -46.47618052653576,
              -33.47618052653576, -48.47618052653576, -14.476180526535757,
              -79.47618052653576, 25.523819473464243, -84.47618052653576,
              42.52381947346424, -70.47618052653576, 38.52381947346424,
              -55.47618052653576, 50.52381947346424, -30.476180526535757,
              16.523819473464243, -30.476180526535757, -19.476180526535757,
              -11.476180526535757, -33.47618052653576, 15.523819473464243,
              -62.47618052653576, 53.52381947346424, 46.52381947346424,
              633.5238194734643, 169.52381947346424, -226.47618052653576,
              -243.47618052653576, -49.47618052653576, -33.47618052653576,
              31.523819473464243, 24.523819473464243, 43.52381947346424,
              63.52381947346424, 16.523819473464243, 99.52381947346424,
              -23.476180526535757, 149.52381947346424, -17.476180526535757,
              184.52381947346424, 31.523819473464243, 210.52381947346424,
              90.52381947346424, 212.52381947346424, 128.52381947346424,
              171.52381947346424, 127.52381947346424, 76.52381947346424,
              24.523819473464243, -74.47618052653576, -67.47618052653576,
              -148.47618052653576, -84.47618052653576, -162.47618052653576,
              -75.47618052653576, -149.47618052653576, -49.47618052653576,
              -132.47618052653576, -26.476180526535757, -109.47618052653576,
              -13.476180526535757, -84.47618052653576, -17.476180526535757,
              -70.47618052653576, -32.47618052653576, -54.47618052653576,
              -54.47618052653576, -23.476180526535757, -79.47618052653576,
              11.523819473464243, -92.47618052653576, 33.52381947346424,
              -70.47618052653576, 18.523819473464243, -52.47618052653576,
              5.523819473464243, -37.47618052653576, -1.4761805265357566,
              5.523819473464243, -11.476180526535757, 16.523819473464243,
              -65.47618052653576, 38.52381947346424, -79.47618052653576,
              53.52381947346424, -68.47618052653576, 62.52381947346424,
              -33.47618052653576, 356.52381947346424, 580.5238194734643,
              -61.47618052653576, -283.47618052653576, -153.47618052653576,
              -46.47618052653576, -5.476180526535757, 51.52381947346424,
              -27.476180526535757, 111.52381947346424, -26.476180526535757,
              133.52381947346424, -24.476180526535757, 142.52381947346424,
              -4.476180526535757, 158.52381947346424, 25.523819473464243,
              173.52381947346424, 77.52381947346424, 207.52381947346424,
              99.52381947346424, 179.52381947346424, 166.52381947346424,
              43.52381947346424, 108.52381947346424, -78.47618052653576,
              -36.47618052653576, -157.47618052653576, -74.47618052653576,
              -171.47618052653576, -70.47618052653576, -148.47618052653576,
              -57.47618052653576, -124.47618052653576, -49.47618052653576,
              -96.47618052653576, -52.47618052653576, -72.47618052653576,
              -58.47618052653576, -46.47618052653576, -71.47618052653576,
              -19.476180526535757, -76.47618052653576, -6.476180526535757,
              -93.47618052653576, 15.523819473464243, -94.47618052653576,
              24.523819473464243, -79.47618052653576, 27.523819473464243,
              -50.47618052653576, -7.476180526535757, -27.476180526535757,
              -28.476180526535757, 5.523819473464243, -18.476180526535757,
              36.52381947346424, -63.47618052653576, 41.52381947346424,
              -79.47618052653576, 58.52381947346424, -65.47618052653576,
              37.52381947346424, -52.47618052653576, 77.52381947346424,
              290.52381947346424, 624.5238194734643, -85.47618052653576,
              -271.47618052653576, -126.47618052653576, -63.47618052653576,
              23.523819473464243, -35.47618052653576, 95.52381947346424,
              -35.47618052653576, 120.52381947346424, -32.47618052653576,
              124.52381947346424, -27.476180526535757, 151.52381947346424,
              -4.476180526535757, 166.52381947346424, 50.52381947346424,
              182.52381947346424, 99.52381947346424, 186.52381947346424,
              137.52381947346424, 131.52381947346424, 128.52381947346424,
              -0.4761805265357566, -1.4761805265357566, -106.47618052653576,
              -63.47618052653576, -156.47618052653576, -80.47618052653576,
              -161.47618052653576, -70.47618052653576, -150.47618052653576,
              -46.47618052653576, -131.47618052653576, -28.476180526535757,
              -105.47618052653576, -20.476180526535757, -75.47618052653576,
              -46.47618052653576, -40.47618052653576, -88.47618052653576,
              20.523819473464243, -67.47618052653576, 36.52381947346424,
              -45.47618052653576, -1.4761805265357566, 10.523819473464243,
              -27.476180526535757, 15.523819473464243, -58.47618052653576,
              27.523819473464243, -67.47618052653576, 41.52381947346424,
              -71.47618052653576, 62.52381947346424, -63.47618052653576,
              256.52381947346424, 520.5238194734643, 144.52381947346424,
              -274.47618052653576, -170.47618052653576, -55.47618052653576,
              -41.47618052653576, 40.52381947346424, -45.47618052653576,
              112.52381947346424, -41.47618052653576, 124.52381947346424,
              -32.47618052653576, 133.52381947346424, -6.476180526535757,
              110.52381947346424, 98.52381947346424, 80.52381947346424,
              172.52381947346424, 64.52381947346424, 244.52381947346424,
              50.52381947346424, 223.52381947346424, 19.523819473464243,
              98.52381947346424, -79.47618052653576, -57.47618052653576,
              -132.47618052653576, -85.47618052653576, -124.47618052653576,
              -114.47618052653576, -100.47618052653576, -110.47618052653576,
              -71.47618052653576, -111.47618052653576, -41.47618052653576,
              -109.47618052653576, -18.476180526535757, -109.47618052653576,
              5.523819473464243, -94.47618052653576, 2.5238194734642434,
              -76.47618052653576, -2.4761805265357566, -67.47618052653576,
              -22.476180526535757, -23.476180526535757, -48.47618052653576,
              -9.476180526535757, -63.47618052653576, 25.523819473464243,
              -75.47618052653576, 53.52381947346424, -72.47618052653576,
              53.52381947346424, -44.47618052653576, 76.52381947346424,
              -22.476180526535757, -2.4761805265357566, -17.476180526535757,
              -19.476180526535757, 7.523819473464243, -59.47618052653576,
              41.52381947346424, -68.47618052653576, 205.52381947346424,
              359.52381947346424, 559.5238194734643, -254.47618052653576,
              -188.47618052653576, -150.47618052653576, 28.523819473464243,
              -41.47618052653576, 54.52381947346424, 32.52381947346424,
              23.523819473464243, 66.52381947346424, 3.5238194734642434,
              123.52381947346424, -15.476180526535757, 150.52381947346424,
              -14.476180526535757, 185.52381947346424, 45.52381947346424,
              212.52381947346424, 71.52381947346424, 219.52381947346424,
              144.52381947346424, 99.52381947346424, 118.52381947346424,
              -54.47618052653576, -19.476180526535757, -148.47618052653576,
              -75.47618052653576, -167.47618052653576, -75.47618052653576,
              -158.47618052653576, -58.47618052653576, -144.47618052653576,
              -46.47618052653576, -123.47618052653576, -46.47618052653576,
              -81.47618052653576, -45.47618052653576, -58.47618052653576,
              -37.47618052653576, -30.476180526535757, -74.47618052653576,
              -5.476180526535757, -78.47618052653576, 2.5238194734642434,
              -83.47618052653576, 23.523819473464243, -87.47618052653576,
              32.52381947346424, -75.47618052653576, 36.52381947346424,
              -65.47618052653576, 25.523819473464243, -24.476180526535757,
              -0.4761805265357566, 23.523819473464243, -46.47618052653576,
              33.52381947346424, -71.47618052653576, 33.52381947346424,
              -76.47618052653576, 55.52381947346424, -66.47618052653576,
              34.52381947346424, 2.5238194734642434, 455.52381947346424,
              511.52381947346424, -162.47618052653576, -236.47618052653576,
              -110.47618052653576, 1.5238194734642434, -33.47618052653576,
              76.52381947346424, -44.47618052653576, 94.52381947346424,
              -39.47618052653576, 114.52381947346424, -31.476180526535757,
              132.52381947346424, -17.476180526535757, 158.52381947346424,
              14.523819473464243, 185.52381947346424, 47.52381947346424,
              198.52381947346424, 153.52381947346424, 166.52381947346424,
              146.52381947346424, 90.52381947346424, 69.52381947346424,
              -68.47618052653576, -44.47618052653576, -156.47618052653576,
              -72.47618052653576, -167.47618052653576, -74.47618052653576,
              -157.47618052653576, -55.47618052653576, -123.47618052653576,
              -54.47618052653576, -76.47618052653576, -70.47618052653576,
              -44.47618052653576, -76.47618052653576, -7.476180526535757,
              -97.47618052653576, 7.523819473464243, -94.47618052653576,
              20.523819473464243, -88.47618052653576, 21.523819473464243,
              -88.47618052653576, 28.523819473464243, -78.47618052653576,
              20.523819473464243, -59.47618052653576, 11.523819473464243,
              -40.47618052653576, -2.4761805265357566, 19.523819473464243,
              -22.476180526535757, 28.523819473464243, -62.47618052653576,
              36.52381947346424, -72.47618052653576, 51.52381947346424,
              -76.47618052653576, 49.52381947346424, -74.47618052653576,
              264.52381947346424, 521.5238194734643, 355.52381947346424,
              -279.47618052653576, -170.47618052653576, -67.47618052653576,
              -40.47618052653576, 55.52381947346424, -41.47618052653576,
              93.52381947346424, -40.47618052653576, 111.52381947346424,
              -40.47618052653576, 137.52381947346424, -20.476180526535757,
              144.52381947346424, 33.52381947346424, 137.52381947346424,
              140.52381947346424, 129.52381947346424, 194.52381947346424,
              112.52381947346424, 215.52381947346424, 46.52381947346424,
              134.52381947346424, -75.47618052653576, -27.476180526535757,
              -150.47618052653576, -75.47618052653576, -165.47618052653576,
              -76.47618052653576, -136.47618052653576, -81.47618052653576,
              -80.47618052653576, -93.47618052653576, -50.47618052653576,
              -100.47618052653576, -15.476180526535757, -105.47618052653576,
              1.5238194734642434, -94.47618052653576, 14.523819473464243,
              -71.47618052653576, -9.476180526535757, -54.47618052653576,
              -20.476180526535757, -27.476180526535757, -61.47618052653576,
              -2.4761805265357566, -61.47618052653576, 24.523819473464243,
              -78.47618052653576, 53.52381947346424, -67.47618052653576,
              81.52381947346424, -52.47618052653576, 11.523819473464243,
              -26.476180526535757, -13.476180526535757, -6.476180526535757,
              -41.47618052653576, 25.523819473464243, -68.47618052653576,
              306.52381947346424, 510.52381947346424, 224.52381947346424,
              -309.47618052653576, -135.47618052653576, -66.47618052653576,
              8.523819473464243, -9.476180526535757, 16.523819473464243,
              45.52381947346424, -11.476180526535757, 101.52381947346424,
              -33.47618052653576, 112.52381947346424, -23.476180526535757,
              150.52381947346424, -11.476180526535757, 186.52381947346424,
              77.52381947346424, 197.52381947346424, 137.52381947346424,
              185.52381947346424, 150.52381947346424, 94.52381947346424,
              68.52381947346424, -58.47618052653576, -48.47618052653576,
              -153.47618052653576, -76.47618052653576, -168.47618052653576,
              -71.47618052653576, -159.47618052653576, -59.47618052653576,
              -137.47618052653576, -54.47618052653576, -93.47618052653576,
              -58.47618052653576, -45.47618052653576, -80.47618052653576,
              -24.476180526535757, -83.47618052653576, -1.4761805265357566,
              -96.47618052653576, 21.523819473464243, -81.47618052653576,
              14.523819473464243, -74.47618052653576, 12.523819473464243,
              -44.47618052653576, -2.4761805265357566, -31.476180526535757,
              -13.476180526535757, 5.523819473464243, -36.47618052653576,
              -0.4761805265357566, -65.47618052653576, 18.523819473464243,
              -80.47618052653576, 50.52381947346424, -76.47618052653576,
              47.52381947346424, 173.52381947346424, 642.5238194734643,
              210.52381947346424, -285.47618052653576, -188.47618052653576,
              -93.47618052653576, 18.523819473464243, -37.47618052653576,
              80.52381947346424, -44.47618052653576, 118.52381947346424,
              -31.476180526535757, 101.52381947346424, 6.523819473464243,
              72.52381947346424, 76.52381947346424, 69.52381947346424,
              156.52381947346424, 77.52381947346424, 228.52381947346424,
              85.52381947346424, 251.52381947346424, 60.52381947346424,
              211.52381947346424, -23.476180526535757, 5.523819473464243,
              -101.47618052653576, -91.47618052653576, -124.47618052653576,
              -120.47618052653576, -105.47618052653576, -128.47618052653576,
              -68.47618052653576, -139.47618052653576, -44.47618052653576,
              -124.47618052653576, -18.476180526535757, -109.47618052653576,
              -1.4761805265357566, -78.47618052653576, -7.476180526535757,
              -63.47618052653576, -28.476180526535757, -49.47618052653576,
              -44.47618052653576, -14.476180526535757, -81.47618052653576,
              24.523819473464243, -83.47618052653576, 53.52381947346424,
              -66.47618052653576, 63.52381947346424, -71.47618052653576,
              24.523819473464243, -52.47618052653576, 14.523819473464243,
              -32.47618052653576, -28.476180526535757, 29.523819473464243,
              -45.47618052653576, 455.52381947346424, 580.5238194734643,
              11.523819473464243, -335.47618052653576, -128.47618052653576,
              -105.47618052653576, 60.52381947346424, -31.476180526535757,
              59.52381947346424, 29.523819473464243, 40.52381947346424,
              56.52381947346424, 23.523819473464243, 95.52381947346424,
              1.5238194734642434, 131.52381947346424, 11.523819473464243,
              192.52381947346424, 59.52381947346424, 225.52381947346424,
              62.52381947346424, 258.52381947346424, 67.52381947346424,
              211.52381947346424, -11.476180526535757, 15.523819473464243,
              -107.47618052653576, -105.47618052653576, -105.47618052653576,
              -154.47618052653576, -85.47618052653576, -159.47618052653576,
              -61.47618052653576, -145.47618052653576, -43.47618052653576,
              -127.47618052653576, -20.476180526535757, -106.47618052653576,
              -10.476180526535757, -72.47618052653576, -30.476180526535757,
              -36.47618052653576, -44.47618052653576, -28.476180526535757,
              -54.47618052653576, -13.476180526535757, -59.47618052653576,
              14.523819473464243, -55.47618052653576, 40.52381947346424,
              -67.47618052653576, 36.52381947346424, -84.47618052653576,
              27.523819473464243, -81.47618052653576, 28.523819473464243,
              -72.47618052653576, 33.52381947346424, -65.47618052653576,
              208.52381947346424, 575.5238194734643, 349.52381947346424,
              -257.47618052653576, -228.47618052653576, -26.476180526535757,
              -68.47618052653576, 75.52381947346424, -49.47618052653576,
              107.52381947346424, -22.476180526535757, 94.52381947346424,
              1.5238194734642434, 105.52381947346424, 25.523819473464243,
              98.52381947346424, 99.52381947346424, 101.52381947346424,
              176.52381947346424, 102.52381947346424, 223.52381947346424,
              94.52381947346424, 240.52381947346424, 36.52381947346424,
              140.52381947346424, -78.47618052653576, -30.476180526535757,
              -156.47618052653576, -80.47618052653576, -167.47618052653576,
              -81.47618052653576, -140.47618052653576, -83.47618052653576,
              -110.47618052653576, -80.47618052653576, -78.47618052653576,
              -71.47618052653576, -52.47618052653576, -78.47618052653576,
              -20.476180526535757, -81.47618052653576, -0.4761805265357566,
              -87.47618052653576, 11.523819473464243, -85.47618052653576,
              33.52381947346424, -78.47618052653576, 42.52381947346424,
              -44.47618052653576, 29.523819473464243, -5.476180526535757,
              -31.476180526535757, -7.476180526535757, -45.47618052653576,
              10.523819473464243, -61.47618052653576, -71.47618052653576,
              63.52381947346424, -52.47618052653576, 111.52381947346424,
              -30.476180526535757, 97.52381947346424, 33.52381947346424,
              62.52381947346424, 101.52381947346424, 18.523819473464243,
              163.52381947346424, 29.523819473464243, 240.52381947346424,
              73.52381947346424, 251.52381947346424, 95.52381947346424,
              193.52381947346424, 42.52381947346424, -22.476180526535757,
              -46.47618052653576, -153.47618052653576, -84.47618052653576,
              -163.47618052653576, -67.47618052653576, -148.47618052653576,
              -49.47618052653576, -114.47618052653576, -52.47618052653576,
              -79.47618052653576, -65.47618052653576, -41.47618052653576,
              -70.47618052653576, -24.476180526535757, -79.47618052653576,
              -2.4761805265357566, -88.47618052653576, 16.523819473464243,
              -87.47618052653576, 31.523819473464243, -61.47618052653576,
              38.52381947346424, -52.47618052653576, -18.476180526535757,
              -26.476180526535757, -48.47618052653576, -6.476180526535757,
              -70.47618052653576, 23.523819473464243, -85.47618052653576,
              169.52381947346424, 456.52381947346424, 349.52381947346424,
              -259.47618052653576, -159.47618052653576, -76.47618052653576,
              -32.47618052653576, -5.476180526535757, -44.47618052653576,
              67.52381947346424, -44.47618052653576, 97.52381947346424,
              -45.47618052653576, 116.52381947346424, -35.47618052653576,
              141.52381947346424, -20.476180526535757, 163.52381947346424,
              15.523819473464243, 199.52381947346424, 72.52381947346424,
              181.52381947346424, 129.52381947346424, 99.52381947346424,
              73.52381947346424, -36.47618052653576, -46.47618052653576,
              -137.47618052653576, -70.47618052653576, -162.47618052653576,
              -66.47618052653576, -153.47618052653576, -46.47618052653576,
              -130.47618052653576, -36.47618052653576, -109.47618052653576,
              -28.476180526535757, -75.47618052653576, -35.47618052653576,
              -54.47618052653576, -61.47618052653576, -20.476180526535757,
              -80.47618052653576, 23.523819473464243, -94.47618052653576,
              28.523819473464243, -81.47618052653576, 43.52381947346424,
              -80.47618052653576, 7.523819473464243, -70.47618052653576,
              7.523819473464243, -65.47618052653576, -9.476180526535757,
              -28.476180526535757, -43.47618052653576, 220.52381947346424,
              493.52381947346424, 94.52381947346424, -298.47618052653576,
              -98.47618052653576, -104.47618052653576, 51.52381947346424,
              -58.47618052653576, 81.52381947346424, -24.476180526535757,
              76.52381947346424, 2.5238194734642434, 64.52381947346424,
              45.52381947346424, 49.52381947346424, 85.52381947346424,
              40.52381947346424, 129.52381947346424, 38.52381947346424,
              194.52381947346424, 41.52381947346424, 207.52381947346424,
              34.52381947346424, 177.52381947346424, -27.476180526535757,
              41.52381947346424, -105.47618052653576, -66.47618052653576,
              -119.47618052653576, -111.47618052653576, -93.47618052653576,
              -100.47618052653576, -67.47618052653576, -97.47618052653576,
              -53.47618052653576, -101.47618052653576, -28.476180526535757,
              -106.47618052653576, -2.4761805265357566, -102.47618052653576,
              10.523819473464243, -91.47618052653576, 2.5238194734642434,
              -68.47618052653576, -5.476180526535757, -53.47618052653576,
              -7.476180526535757, -45.47618052653576, -27.476180526535757,
              25.523819473464243, -45.47618052653576, 46.52381947346424,
              -59.47618052653576, 20.523819473464243, -81.47618052653576,
              36.52381947346424, -81.47618052653576, 37.52381947346424,
              -81.47618052653576, 49.52381947346424, 56.52381947346424,
              597.5238194734643, 94.52381947346424, -210.47618052653576,
              -174.47618052653576, -48.47618052653576, 19.523819473464243,
              -20.476180526535757, 94.52381947346424, -46.47618052653576,
              119.52381947346424, -37.47618052653576, 127.52381947346424,
              -31.476180526535757, 138.52381947346424, -5.476180526535757,
              146.52381947346424, 75.52381947346424, 142.52381947346424,
              138.52381947346424, 127.52381947346424, 147.52381947346424,
              114.52381947346424, 133.52381947346424, 12.523819473464243,
              18.523819473464243, -92.47618052653576, -48.47618052653576,
              -144.47618052653576, -63.47618052653576, -153.47618052653576,
              -46.47618052653576, -130.47618052653576, -37.47618052653576,
              -101.47618052653576, -36.47618052653576, -54.47618052653576,
              -54.47618052653576, -31.476180526535757, -70.47618052653576,
              -11.476180526535757, -83.47618052653576, 2.5238194734642434,
              -89.47618052653576, 8.523819473464243, -92.47618052653576,
              29.523819473464243, -78.47618052653576, 8.523819473464243,
              -44.47618052653576, -11.476180526535757, -17.476180526535757,
              -30.476180526535757, 5.523819473464243, -45.47618052653576,
              29.523819473464243, -55.47618052653576, 59.52381947346424,
              -55.47618052653576, 72.52381947346424, -72.47618052653576,
              56.52381947346424, -62.47618052653576, 29.523819473464243,
              -24.476180526535757, 2.5238194734642434, 8.523819473464243,
              167.52381947346424, 595.5238194734643, -10.476180526535757,
              -217.47618052653576, -179.47618052653576, -5.476180526535757,
              -67.47618052653576, 81.52381947346424, -52.47618052653576,
              111.52381947346424, -35.47618052653576, 115.52381947346424,
              -23.476180526535757, 112.52381947346424, -2.4761805265357566,
              95.52381947346424, 33.52381947346424, 94.52381947346424,
              94.52381947346424, 79.52381947346424, 134.52381947346424,
              27.523819473464243, 188.52381947346424, -2.4761805265357566,
              145.52381947346424, -59.47618052653576, 8.523819473464243,
              -114.47618052653576, -59.47618052653576, -131.47618052653576,
              -75.47618052653576, -94.47618052653576, -97.47618052653576,
              -48.47618052653576, -98.47618052653576, -23.476180526535757,
              -101.47618052653576, -14.476180526535757, -104.47618052653576,
              10.523819473464243, -96.47618052653576, 6.523819473464243,
              -88.47618052653576, -9.476180526535757, -72.47618052653576,
              -5.476180526535757, -66.47618052653576, -9.476180526535757,
              -46.47618052653576, -1.4761805265357566, -48.47618052653576,
              -30.476180526535757, -27.476180526535757, -41.47618052653576,
              1.5238194734642434, -57.47618052653576, 24.523819473464243,
              -55.47618052653576, 45.52381947346424, -55.47618052653576,
              66.52381947346424, -74.47618052653576, 62.52381947346424,
              -75.47618052653576, 50.52381947346424, -65.47618052653576,
              23.523819473464243, -43.47618052653576, 115.52381947346424,
              408.52381947346424, 262.52381947346424, -226.47618052653576,
              -210.47618052653576, -13.476180526535757, -67.47618052653576,
              84.52381947346424, -39.47618052653576, 110.52381947346424,
              -1.4761805265357566, 68.52381947346424, 18.523819473464243,
              45.52381947346424, 66.52381947346424, 67.52381947346424,
              116.52381947346424, 32.52381947346424, 159.52381947346424,
              14.523819473464243, 205.52381947346424, 16.523819473464243,
              205.52381947346424, 10.523819473464243, 144.52381947346424,
              -33.47618052653576, -40.47618052653576, -85.47618052653576,
              -105.47618052653576, -91.47618052653576, -136.47618052653576,
              -58.47618052653576, -139.47618052653576, -30.476180526535757,
              -114.47618052653576, -33.47618052653576, -68.47618052653576,
              -49.47618052653576, -54.47618052653576, -58.47618052653576,
              -30.476180526535757, -78.47618052653576, -9.476180526535757,
              -89.47618052653576, -1.4761805265357566, -97.47618052653576,
              25.523819473464243, -85.47618052653576, 15.523819473464243,
              -52.47618052653576, 6.523819473464243, -32.47618052653576,
              -7.476180526535757, 7.523819473464243, -13.476180526535757,
              7.523819473464243, -52.47618052653576, 19.523819473464243,
              -74.47618052653576, 58.52381947346424, -75.47618052653576,
              58.52381947346424, -72.47618052653576, 211.52381947346424,
              386.52381947346424, 484.52381947346424, -250.47618052653576,
              -217.47618052653576, -139.47618052653576, 7.523819473464243,
              -7.476180526535757, 42.52381947346424, 53.52381947346424,
              43.52381947346424, 102.52381947346424, 18.523819473464243,
              124.52381947346424, -1.4761805265357566, 158.52381947346424,
              -1.4761805265357566, 194.52381947346424, 46.52381947346424,
              198.52381947346424, 92.52381947346424, 173.52381947346424,
              115.52381947346424, 121.52381947346424, 85.52381947346424,
              -2.4761805265357566, -32.47618052653576, -101.47618052653576,
              -68.47618052653576, -145.47618052653576, -66.47618052653576,
              -146.47618052653576, -49.47618052653576, -132.47618052653576,
              -31.476180526535757, -89.47618052653576, -45.47618052653576,
              -65.47618052653576, -45.47618052653576, -43.47618052653576,
              -62.47618052653576, -19.476180526535757, -78.47618052653576,
              -7.476180526535757, -92.47618052653576, 16.523819473464243,
              -84.47618052653576, 24.523819473464243, -67.47618052653576,
              7.523819473464243, -49.47618052653576, -0.4761805265357566,
              -19.476180526535757, 1.5238194734642434, 7.523819473464243,
              -55.47618052653576, 25.523819473464243, -75.47618052653576,
              60.52381947346424, -75.47618052653576, 56.52381947346424,
              -59.47618052653576, 281.52381947346424, 502.52381947346424,
              103.52381947346424, -283.47618052653576, -156.47618052653576,
              -62.47618052653576, -24.476180526535757, 67.52381947346424,
              -36.47618052653576, 123.52381947346424, -33.47618052653576,
              134.52381947346424, -26.476180526535757, 138.52381947346424,
              -15.476180526535757, 162.52381947346424, -5.476180526535757,
              37.52381947346424, 144.52381947346424, 49.52381947346424,
              182.52381947346424, 32.52381947346424, 179.52381947346424,
              -6.476180526535757, 107.52381947346424, -88.47618052653576,
              -17.476180526535757, -145.47618052653576, -63.47618052653576,
              -146.47618052653576, -67.47618052653576, -118.47618052653576,
              -55.47618052653576, -85.47618052653576, -53.47618052653576,
              -62.47618052653576, -63.47618052653576, -39.47618052653576,
              -79.47618052653576, -22.476180526535757, -97.47618052653576,
              -14.476180526535757, -48.47618052653576, -55.47618052653576,
              -30.476180526535757, -75.47618052653576, -10.476180526535757,
              -81.47618052653576, 20.523819473464243, -84.47618052653576,
              37.52381947346424, -70.47618052653576, 66.52381947346424,
              -46.47618052653576, 14.523819473464243, -37.47618052653576,
              -41.47618052653576, 5.523819473464243, -58.47618052653576,
              28.523819473464243, -55.47618052653576, 323.52381947346424,
              453.52381947346424, -54.47618052653576, -275.47618052653576,
              -75.47618052653576, -50.47618052653576, 14.523819473464243,
              8.523819473464243, 25.523819473464243, 58.52381947346424,
              7.523819473464243, 80.52381947346424, -6.476180526535757,
              123.52381947346424, -17.476180526535757, 160.52381947346424,
              -5.476180526535757, 188.52381947346424, 28.523819473464243,
              194.52381947346424, 63.52381947346424, 162.52381947346424,
              111.52381947346424, 77.52381947346424, 37.52381947346424,
              -59.47618052653576, -120.47618052653576, -13.476180526535757,
              -106.47618052653576, 2.5238194734642434, -83.47618052653576,
              1.5238194734642434, -67.47618052653576, -6.476180526535757,
              -57.47618052653576, -23.476180526535757, -33.47618052653576,
              -49.47618052653576, 8.523819473464243, -71.47618052653576,
              21.523819473464243, -68.47618052653576, 28.523819473464243,
              -61.47618052653576, 73.52381947346424, -68.47618052653576,
              55.52381947346424, -78.47618052653576, 43.52381947346424,
              -52.47618052653576, 33.52381947346424, -45.47618052653576,
              18.523819473464243, 71.52381947346424, 427.52381947346424,
              350.52381947346424, -231.47618052653576, -150.47618052653576,
              -107.47618052653576, 56.52381947346424, -58.47618052653576,
              99.52381947346424, -20.476180526535757, 107.52381947346424,
              5.523819473464243, 81.52381947346424, 63.52381947346424,
              16.523819473464243, 107.52381947346424, 7.523819473464243,
              154.52381947346424, 11.523819473464243, 207.52381947346424,
              21.523819473464243, 215.52381947346424, 28.523819473464243,
              177.52381947346424, -11.476180526535757, 20.523819473464243,
              -76.47618052653576, -101.47618052653576, -93.47618052653576,
              -126.47618052653576, -81.47618052653576, -139.47618052653576,
              -41.47618052653576, -131.47618052653576, -26.476180526535757,
              -118.47618052653576, -24.476180526535757, -87.47618052653576,
              -28.476180526535757, -68.47618052653576, -18.476180526535757,
              -65.47618052653576, -37.47618052653576, -43.47618052653576,
              -22.476180526535757, -45.47618052653576, -50.47618052653576,
              -2.4761805265357566, -71.47618052653576, 15.523819473464243,
              -83.47618052653576, 50.52381947346424, -66.47618052653576,
              69.52381947346424, -61.47618052653576, 14.523819473464243,
              -18.476180526535757, -32.47618052653576, 8.523819473464243,
              -67.47618052653576, 36.52381947346424, -48.47618052653576,
              443.52381947346424, 363.52381947346424, -156.47618052653576,
              -232.47618052653576, -76.47618052653576, -24.476180526535757,
              8.523819473464243, 40.52381947346424, -31.476180526535757,
              105.52381947346424, -40.47618052653576, 140.52381947346424,
              -9.476180526535757, 136.52381947346424, 37.52381947346424,
              97.52381947346424, 108.52381947346424, 99.52381947346424,
              164.52381947346424, 73.52381947346424, 199.52381947346424,
              45.52381947346424, 190.52381947346424, -22.476180526535757,
              58.52381947346424, -117.47618052653576, -52.47618052653576,
              -145.47618052653576, -76.47618052653576, -132.47618052653576,
              -94.47618052653576, -89.47618052653576, -92.47618052653576,
              -61.47618052653576, -105.47618052653576, -39.47618052653576,
              -106.47618052653576, -18.476180526535757, -105.47618052653576,
              5.523819473464243, -91.47618052653576, 10.523819473464243,
              -74.47618052653576, -24.476180526535757, -52.47618052653576,
              -35.47618052653576, -27.476180526535757, -41.47618052653576,
              -4.476180526535757, -62.47618052653576, 31.523819473464243,
              -57.47618052653576, 63.52381947346424, -70.47618052653576,
              41.52381947346424, -75.47618052653576, 49.52381947346424,
              -61.47618052653576, 45.52381947346424, -27.476180526535757,
              50.52381947346424, 311.52381947346424, 598.5238194734643,
              -48.47618052653576, -300.47618052653576, -149.47618052653576,
              -83.47618052653576, 98.52381947346424, -18.476180526535757,
              123.52381947346424, 18.523819473464243, 107.52381947346424,
              38.52381947346424, 64.52381947346424, 119.52381947346424,
              40.52381947346424, 156.52381947346424, 38.52381947346424,
              206.52381947346424, 32.52381947346424, 240.52381947346424,
              45.52381947346424, 234.52381947346424, 40.52381947346424,
              169.52381947346424, -41.47618052653576, 11.523819473464243,
              -111.47618052653576, -66.47618052653576, -135.47618052653576,
              -91.47618052653576, -110.47618052653576, -94.47618052653576,
              -88.47618052653576, -94.47618052653576, -40.47618052653576,
              -106.47618052653576, -19.476180526535757, -109.47618052653576,
              -2.4761805265357566, -102.47618052653576, 5.523819473464243,
              -105.47618052653576, 7.523819473464243, -76.47618052653576,
              -19.476180526535757, -46.47618052653576, -32.47618052653576,
              -32.47618052653576, -55.47618052653576, 20.523819473464243,
              -74.47618052653576, 43.52381947346424, -61.47618052653576,
              55.52381947346424, -67.47618052653576, 38.52381947346424,
              -71.47618052653576, 43.52381947346424, -66.47618052653576,
              38.52381947346424, -44.47618052653576, 72.52381947346424,
              338.52381947346424, 585.5238194734643, -127.47618052653576,
              -266.47618052653576, -123.47618052653576, -70.47618052653576,
              37.52381947346424, -40.47618052653576, 95.52381947346424,
              -39.47618052653576, 119.52381947346424, -24.476180526535757,
              132.52381947346424, -1.4761805265357566, 115.52381947346424,
              73.52381947346424, 94.52381947346424, 160.52381947346424,
              41.52381947346424, 232.52381947346424, 54.52381947346424,
              225.52381947346424, 42.52381947346424, 134.52381947346424,
              -45.47618052653576, -27.476180526535757, -113.47618052653576,
              -104.47618052653576, -101.47618052653576, -139.47618052653576,
              -80.47618052653576, -132.47618052653576, -53.47618052653576,
              -131.47618052653576, -27.476180526535757, -118.47618052653576,
              -10.476180526535757, -106.47618052653576, 1.5238194734642434,
              -76.47618052653576, -26.476180526535757, -54.47618052653576,
              -15.476180526535757, -53.47618052653576, -40.47618052653576,
              -41.47618052653576, -53.47618052653576, -9.476180526535757,
              -39.47618052653576, -13.476180526535757, -58.47618052653576,
              34.52381947346424, -54.47618052653576, 40.52381947346424,
              -80.47618052653576, 41.52381947346424, -75.47618052653576,
              32.52381947346424, -32.47618052653576, -28.476180526535757,
              36.52381947346424, 318.52381947346424, 611.5238194734643,
              -128.47618052653576, -220.47618052653576, -166.47618052653576,
              14.523819473464243, -63.47618052653576, 98.52381947346424,
              -37.47618052653576, 115.52381947346424, -13.476180526535757,
              112.52381947346424, 10.523819473464243, 107.52381947346424,
              37.52381947346424, 75.52381947346424, 133.52381947346424,
              59.52381947346424, 198.52381947346424, 55.52381947346424,
              241.52381947346424, 49.52381947346424, 225.52381947346424,
              3.5238194734642434, 86.52381947346424, -81.47618052653576,
              -75.47618052653576, -113.47618052653576, -117.47618052653576,
              -104.47618052653576, -119.47618052653576, -75.47618052653576,
              -135.47618052653576, -44.47618052653576, -126.47618052653576,
              -18.476180526535757, -113.47618052653576, -2.4761805265357566,
              -87.47618052653576, -17.476180526535757, -68.47618052653576,
              -24.476180526535757, -49.47618052653576, -20.476180526535757,
              -28.476180526535757, -53.47618052653576, -2.4761805265357566,
              -79.47618052653576, 28.523819473464243, -79.47618052653576,
              66.52381947346424, -72.47618052653576, 49.52381947346424,
              -83.47618052653576, 40.52381947346424, -41.47618052653576,
              -9.476180526535757, -26.476180526535757, -18.476180526535757,
              -0.4761805265357566, 173.52381947346424, 595.5238194734643,
              -68.47618052653576, -222.47618052653576, -181.47618052653576,
              16.523819473464243, -62.47618052653576, 89.52381947346424,
              -23.476180526535757, 80.52381947346424, 2.5238194734642434,
              85.52381947346424, 29.523819473464243, 58.52381947346424,
              88.52381947346424, 6.523819473464243, 154.52381947346424,
              31.523819473464243, 208.52381947346424, 51.52381947346424,
              229.52381947346424, 47.52381947346424, 232.52381947346424,
              6.523819473464243, 124.52381947346424, -85.47618052653576,
              -26.476180526535757, -144.47618052653576, -67.47618052653576,
              -143.47618052653576, -75.47618052653576, -120.47618052653576,
              -74.47618052653576, -98.47618052653576, -78.47618052653576,
              -43.47618052653576, -97.47618052653576, -18.476180526535757,
              -104.47618052653576, 5.523819473464243, -94.47618052653576,
              12.523819473464243, -91.47618052653576, 15.523819473464243,
              -68.47618052653576, 6.523819473464243, -57.47618052653576,
              -14.476180526535757, -11.476180526535757, -48.47618052653576,
              2.5238194734642434, -59.47618052653576, 37.52381947346424,
              -76.47618052653576, 76.52381947346424, -65.47618052653576,
              79.52381947346424, -70.47618052653576, 50.52381947346424,
              -53.47618052653576, 32.52381947346424, -45.47618052653576,
              29.523819473464243, -10.476180526535757, -18.476180526535757,
              388.52381947346424, 380.52381947346424, -132.47618052653576,
              -261.47618052653576, -41.47618052653576, -58.47618052653576,
              29.523819473464243, 19.523819473464243, -11.476180526535757,
              93.52381947346424, -33.47618052653576, 114.52381947346424,
              -35.47618052653576, 129.52381947346424, -20.476180526535757,
              159.52381947346424, 14.523819473464243, 176.52381947346424,
              67.52381947346424, 193.52381947346424, 125.52381947346424,
              149.52381947346424, 129.52381947346424, 53.52381947346424,
              20.523819473464243, -74.47618052653576, -62.47618052653576,
              -140.47618052653576, -75.47618052653576, -158.47618052653576,
              -59.47618052653576, -124.47618052653576, -62.47618052653576,
              -83.47618052653576, -72.47618052653576, -65.47618052653576,
              -72.47618052653576, -37.47618052653576, -88.47618052653576,
              -2.4761805265357566, -97.47618052653576, 10.523819473464243,
              -94.47618052653576, 12.523819473464243, -87.47618052653576,
              16.523819473464243, -75.47618052653576, 14.523819473464243,
              -55.47618052653576, -4.476180526535757, -40.47618052653576,
              -49.47618052653576, -7.476180526535757, -70.47618052653576,
              34.52381947346424, -76.47618052653576, 56.52381947346424,
              -74.47618052653576, 76.52381947346424, -55.47618052653576,
              76.52381947346424, -52.47618052653576, 7.523819473464243,
              -27.476180526535757, -14.476180526535757, -10.476180526535757,
              -40.47618052653576, 33.52381947346424, -22.476180526535757,
              453.52381947346424, 345.52381947346424, -167.47618052653576,
              -62.47618052653576, 19.523819473464243, -11.476180526535757,
              79.52381947346424, -28.476180526535757, 129.52381947346424,
              -36.47618052653576, 134.52381947346424, -11.476180526535757,
              121.52381947346424, 24.523819473464243, 98.52381947346424,
              179.52381947346424, 12.523819473464243, 223.52381947346424,
              47.52381947346424, 214.52381947346424, 79.52381947346424,
              145.52381947346424, 5.523819473464243, -18.476180526535757,
              -81.47618052653576, -114.47618052653576, -104.47618052653576,
              -139.47618052653576, -88.47618052653576, -145.47618052653576,
              -54.47618052653576, -136.47618052653576, -27.476180526535757,
              -106.47618052653576, -23.476180526535757, -84.47618052653576,
              -22.476180526535757, -43.47618052653576, -62.47618052653576,
              -26.476180526535757, -70.47618052653576, -5.476180526535757,
              -70.47618052653576, 28.523819473464243, -53.47618052653576,
              21.523819473464243, -14.476180526535757, -9.476180526535757,
              31.523819473464243, -35.47618052653576, 23.523819473464243,
              -55.47618052653576, 38.52381947346424, -66.47618052653576,
              53.52381947346424, -68.47618052653576, 53.52381947346424,
              -5.476180526535757, 532.5238194734643, 390.52381947346424,
              -157.47618052653576, -289.47618052653576, -75.47618052653576,
              -61.47618052653576, 79.52381947346424, 7.523819473464243,
              56.52381947346424, 56.52381947346424, 20.523819473464243,
              93.52381947346424, -0.4761805265357566, 132.52381947346424,
              -1.4761805265357566, 163.52381947346424, 11.523819473464243,
              206.52381947346424, 40.52381947346424, 238.52381947346424,
              59.52381947346424, 234.52381947346424, 72.52381947346424,
              144.52381947346424, 28.523819473464243, -65.47618052653576,
              -62.47618052653576, -136.47618052653576, -85.47618052653576,
              -158.47618052653576, -71.47618052653576, -154.47618052653576,
              -46.47618052653576, -137.47618052653576, -30.476180526535757,
              -106.47618052653576, -26.476180526535757, -72.47618052653576,
              -28.476180526535757, -49.47618052653576, -58.47618052653576,
              -19.476180526535757, -96.47618052653576, 15.523819473464243,
              -89.47618052653576, 18.523819473464243, -76.47618052653576,
              18.523819473464243, -62.47618052653576, 8.523819473464243,
              -48.47618052653576, -20.476180526535757, 7.523819473464243,
              -43.47618052653576, 27.523819473464243, -48.47618052653576,
              63.52381947346424, -59.47618052653576, 64.52381947346424,
              -75.47618052653576, 54.52381947346424, -61.47618052653576,
              41.52381947346424, -49.47618052653576, 24.523819473464243,
              64.52381947346424, 471.52381947346424, 376.52381947346424,
              -252.47618052653576, -205.47618052653576, -126.47618052653576,
              97.52381947346424, 8.523819473464243, 46.52381947346424,
              79.52381947346424, 14.523819473464243, 149.52381947346424,
              -7.476180526535757, 190.52381947346424, 29.523819473464243,
              212.52381947346424, 115.52381947346424, 156.52381947346424,
              140.52381947346424, 76.52381947346424, 79.52381947346424,
              -110.47618052653576, -54.47618052653576, -113.47618052653576,
              -101.47618052653576, -105.47618052653576, -110.47618052653576,
              -72.47618052653576, -124.47618052653576, -40.47618052653576,
              -118.47618052653576, -18.476180526535757, -110.47618052653576,
              -5.476180526535757, -89.47618052653576, -13.476180526535757,
              -63.47618052653576, -39.47618052653576, -37.47618052653576,
              -57.47618052653576, -11.476180526535757, -68.47618052653576,
              -1.4761805265357566, -83.47618052653576, 24.523819473464243,
              -83.47618052653576, 41.52381947346424, -78.47618052653576,
              43.52381947346424, -63.47618052653576, 28.523819473464243,
              -31.476180526535757, -14.476180526535757, 3.5238194734642434,
              -37.47618052653576, 67.52381947346424, -59.47618052653576,
              59.52381947346424, -70.47618052653576, 50.52381947346424,
              -43.47618052653576, 31.523819473464243, -30.476180526535757,
              -20.476180526535757, 127.52381947346424, 429.52381947346424,
              323.52381947346424, -284.47618052653576, -139.47618052653576,
              -115.47618052653576, 67.52381947346424, -58.47618052653576,
              86.52381947346424, -19.476180526535757, 71.52381947346424,
              34.52381947346424, 20.523819473464243, 60.52381947346424,
              8.523819473464243, 105.52381947346424, 1.5238194734642434,
              141.52381947346424, 11.523819473464243, 181.52381947346424,
              41.52381947346424, 207.52381947346424, 29.523819473464243,
              206.52381947346424, -4.476180526535757, 85.52381947346424,
              -76.47618052653576, -44.47618052653576, -118.47618052653576,
              -88.47618052653576, -119.47618052653576, -98.47618052653576,
              -96.47618052653576, -111.47618052653576, -45.47618052653576,
              -123.47618052653576, -13.476180526535757, -110.47618052653576,
              -0.4761805265357566, -89.47618052653576, -23.476180526535757,
              -48.47618052653576, -46.47618052653576, -32.47618052653576,
              -63.47618052653576, -7.476180526535757, -92.47618052653576,
              29.523819473464243, -85.47618052653576, 21.523819473464243,
              -61.47618052653576, 11.523819473464243, -40.47618052653576,
              -5.476180526535757, -17.476180526535757, -24.476180526535757,
              7.523819473464243, -45.47618052653576, 40.52381947346424,
              -59.47618052653576, 38.52381947346424, -68.47618052653576,
              62.52381947346424, -58.47618052653576, 79.52381947346424,
              -49.47618052653576, 54.52381947346424, -41.47618052653576,
              20.523819473464243, -15.476180526535757, -20.476180526535757,
              14.523819473464243, -37.47618052653576, 268.52381947346424,
              477.52381947346424, 5.523819473464243, -288.47618052653576,
              -70.47618052653576, -91.47618052653576, 68.52381947346424,
              -48.47618052653576, 81.52381947346424, -23.476180526535757,
              75.52381947346424, 20.523819473464243, 16.523819473464243,
              99.52381947346424, -24.476180526535757, 129.52381947346424,
              -15.476180526535757, 172.52381947346424, 6.523819473464243,
              197.52381947346424, 47.52381947346424, 190.52381947346424,
              84.52381947346424, 85.52381947346424, 41.52381947346424,
              -44.47618052653576, -50.47618052653576, -120.47618052653576,
              -75.47618052653576, -152.47618052653576, -68.47618052653576,
              -153.47618052653576, -52.47618052653576, -143.47618052653576,
              -36.47618052653576, -124.47618052653576, -22.476180526535757,
              -102.47618052653576, -14.476180526535757, -84.47618052653576,
              -15.476180526535757, -61.47618052653576, -28.476180526535757,
              -39.47618052653576, -54.47618052653576, -2.4761805265357566,
              -83.47618052653576, 11.523819473464243, -91.47618052653576,
              25.523819473464243, -91.47618052653576, 38.52381947346424,
              -67.47618052653576, 27.523819473464243, -45.47618052653576,
              -4.476180526535757, -11.476180526535757, -15.476180526535757,
              19.523819473464243, -40.47618052653576, 62.52381947346424,
              -67.47618052653576, 45.52381947346424, -72.47618052653576,
              59.52381947346424, -68.47618052653576, 54.52381947346424,
              -54.47618052653576, 108.52381947346424, 273.52381947346424,
              606.5238194734643, -140.47618052653576, -268.47618052653576,
              -104.47618052653576, -71.47618052653576, 71.52381947346424,
              -41.47618052653576, 128.52381947346424, -35.47618052653576,
              137.52381947346424, -26.476180526535757, 140.52381947346424,
              -14.476180526535757, 137.52381947346424, 41.52381947346424,
              140.52381947346424, 106.52381947346424, 123.52381947346424,
              188.52381947346424, 81.52381947346424, 203.52381947346424,
              49.52381947346424, 175.52381947346424, -36.47618052653576,
              23.523819473464243, -119.47618052653576, -58.47618052653576,
              -154.47618052653576, -76.47618052653576, -126.47618052653576,
              -83.47618052653576, -74.47618052653576, -105.47618052653576,
              -52.47618052653576, -97.47618052653576, -33.47618052653576,
              -102.47618052653576, -5.476180526535757, -104.47618052653576,
              11.523819473464243, -91.47618052653576, 3.5238194734642434,
              -74.47618052653576, -5.476180526535757, -62.47618052653576,
              -15.476180526535757, -20.476180526535757, -45.47618052653576,
              14.523819473464243, -72.47618052653576, 51.52381947346424,
              -61.47618052653576, 32.52381947346424, -27.476180526535757,
              28.523819473464243, 16.523819473464243, -37.47618052653576,
              27.523819473464243, -71.47618052653576, 41.52381947346424,
              -76.47618052653576, 54.52381947346424, -66.47618052653576,
              173.52381947346424, 447.52381947346424, 463.52381947346424,
              -230.47618052653576, -231.47618052653576, -100.47618052653576,
              -33.47618052653576, 46.52381947346424, -26.476180526535757,
              115.52381947346424, -32.47618052653576, 128.52381947346424,
              -18.476180526535757, 141.52381947346424, -0.4761805265357566,
              146.52381947346424, 54.52381947346424, 141.52381947346424,
              111.52381947346424, 123.52381947346424, 188.52381947346424,
              81.52381947346424, 201.52381947346424, 37.52381947346424,
              144.52381947346424, -61.47618052653576, -5.476180526535757,
              -130.47618052653576, -80.47618052653576, -130.47618052653576,
              -88.47618052653576, -126.47618052653576, -78.47618052653576,
              -75.47618052653576, -102.47618052653576, -45.47618052653576,
              -97.47618052653576, -18.476180526535757, -106.47618052653576,
              -0.4761805265357566, -97.47618052653576, 8.523819473464243,
              -87.47618052653576, -13.476180526535757, -65.47618052653576,
              -28.476180526535757, -40.47618052653576, -44.47618052653576,
              -23.476180526535757, -48.47618052653576, -4.476180526535757,
              -59.47618052653576, 20.523819473464243, -76.47618052653576,
              53.52381947346424, -74.47618052653576, 67.52381947346424,
              -35.47618052653576, 28.523819473464243, -33.47618052653576,
              -2.4761805265357566, -26.476180526535757, -24.476180526535757,
              -10.476180526535757, -36.47618052653576, 20.523819473464243,
              28.523819473464243, 553.5238194734643, 181.52381947346424,
              -211.47618052653576, -227.47618052653576, -24.476180526535757,
              -50.47618052653576, 58.52381947346424, -7.476180526535757,
              53.52381947346424, 25.523819473464243, 42.52381947346424,
              62.52381947346424, 21.523819473464243, 98.52381947346424,
              -11.476180526535757, 154.52381947346424, -9.476180526535757,
              197.52381947346424, 36.52381947346424, 193.52381947346424,
              102.52381947346424, 112.52381947346424, 140.52381947346424,
              7.523819473464243, 19.523819473464243, -104.47618052653576,
              -48.47618052653576, -161.47618052653576, -63.47618052653576,
              -140.47618052653576, -59.47618052653576, -124.47618052653576,
              -54.47618052653576, -81.47618052653576, -57.47618052653576,
              -62.47618052653576, -67.47618052653576, -44.47618052653576,
              -84.47618052653576, -19.476180526535757, -93.47618052653576,
              1.5238194734642434, -92.47618052653576, 14.523819473464243,
              -93.47618052653576, 24.523819473464243, -80.47618052653576,
              18.523819473464243, -62.47618052653576, 3.5238194734642434,
              -54.47618052653576, -33.47618052653576, 20.523819473464243,
              -74.47618052653576, 31.523819473464243, -65.47618052653576,
              71.52381947346424, -70.47618052653576, 53.52381947346424,
              -74.47618052653576, 38.52381947346424, -46.47618052653576,
              21.523819473464243, -22.476180526535757, -15.476180526535757,
              264.52381947346424, 499.52381947346424, 6.523819473464243,
              -285.47618052653576, -85.47618052653576, -83.47618052653576,
              73.52381947346424, -43.47618052653576, 93.52381947346424,
              -14.476180526535757, 106.52381947346424, -9.476180526535757,
              95.52381947346424, 46.52381947346424, 28.523819473464243,
              94.52381947346424, 10.523819473464243, 160.52381947346424,
              10.523819473464243, 214.52381947346424, 23.523819473464243,
              223.52381947346424, 33.52381947346424, 164.52381947346424,
              -11.476180526535757, 7.523819473464243, -63.47618052653576,
              -127.47618052653576, -22.476180526535757, -117.47618052653576,
              -0.4761805265357566, -105.47618052653576, 10.523819473464243,
              -75.47618052653576, 3.5238194734642434, -61.47618052653576,
              -19.476180526535757, -23.476180526535757, -44.47618052653576,
              -28.476180526535757, -50.47618052653576, -7.476180526535757,
              -72.47618052653576, 41.52381947346424, -81.47618052653576,
              53.52381947346424, -74.47618052653576, 55.52381947346424,
              -66.47618052653576, 81.52381947346424, -43.47618052653576,
              53.52381947346424, -35.47618052653576, 7.523819473464243,
              -10.476180526535757, -52.47618052653576, 38.52381947346424,
              -68.47618052653576, 55.52381947346424, 80.52381947346424,
              624.5238194734643, -22.476180526535757, -226.47618052653576,
              -219.47618052653576, -18.476180526535757, -15.476180526535757,
              28.523819473464243, 11.523819473464243, 18.523819473464243,
              69.52381947346424, -7.476180526535757, 107.52381947346424,
              -19.476180526535757, 127.52381947346424, -22.476180526535757,
              172.52381947346424, 8.523819473464243, 193.52381947346424,
              90.52381947346424, 189.52381947346424, 129.52381947346424,
              155.52381947346424, 101.52381947346424, 53.52381947346424,
              1.5238194734642434, -62.47618052653576, -79.47618052653576,
              -126.47618052653576, -92.47618052653576, -144.47618052653576,
              -71.47618052653576, -144.47618052653576, -49.47618052653576,
              -132.47618052653576, -26.476180526535757, -110.47618052653576,
              -20.476180526535757, -93.47618052653576, -5.476180526535757,
              -80.47618052653576, -7.476180526535757, -72.47618052653576,
              -26.476180526535757, -55.47618052653576, -41.47618052653576,
              -28.476180526535757, -61.47618052653576, -17.476180526535757,
              -62.47618052653576, 12.523819473464243, -80.47618052653576,
              47.52381947346424, -80.47618052653576, 55.52381947346424,
              -74.47618052653576, 79.52381947346424, -57.47618052653576,
              75.52381947346424, -57.47618052653576, 49.52381947346424,
              -46.47618052653576, 31.523819473464243, -55.47618052653576,
              36.52381947346424, -33.47618052653576, 93.52381947346424,
              401.52381947346424, 528.5238194734643, -162.47618052653576,
              -285.47618052653576, -88.47618052653576, -74.47618052653576,
              86.52381947346424, -43.47618052653576, 123.52381947346424,
              -32.47618052653576, 132.52381947346424, -20.476180526535757,
              140.52381947346424, -4.476180526535757, 153.52381947346424,
              47.52381947346424, 120.52381947346424, 133.52381947346424,
              133.52381947346424, 184.52381947346424, 124.52381947346424,
              180.52381947346424, 94.52381947346424, 155.52381947346424,
              -26.476180526535757, 12.523819473464243, -106.47618052653576,
              -63.47618052653576, -162.47618052653576, -74.47618052653576,
              -162.47618052653576, -59.47618052653576, -141.47618052653576,
              -45.47618052653576, -104.47618052653576, -48.47618052653576,
              -79.47618052653576, -59.47618052653576, -30.476180526535757,
              -93.47618052653576, -7.476180526535757, -96.47618052653576,
              5.523819473464243, -97.47618052653576, 16.523819473464243,
              -97.47618052653576, 19.523819473464243, -83.47618052653576,
              16.523819473464243, -61.47618052653576, 7.523819473464243,
              -45.47618052653576, 21.523819473464243, -24.476180526535757,
              10.523819473464243, 10.523819473464243, -11.476180526535757,
              23.523819473464243, -48.47618052653576, 20.523819473464243,
              -66.47618052653576, 51.52381947346424, -74.47618052653576,
              53.52381947346424, -53.47618052653576, 351.52381947346424,
              540.5238194734643, -46.47618052653576, -274.47618052653576,
              -139.47618052653576, -30.476180526535757, -10.476180526535757,
              36.52381947346424, -5.476180526535757, 84.52381947346424,
              -23.476180526535757, 138.52381947346424, -31.476180526535757,
              145.52381947346424, -19.476180526535757, 158.52381947346424,
              -1.4761805265357566, 192.52381947346424, 42.52381947346424,
              205.52381947346424, 129.52381947346424, 176.52381947346424,
              142.52381947346424, 71.52381947346424, 71.52381947346424,
              -52.47618052653576, -45.47618052653576, -141.47618052653576,
              -80.47618052653576, -165.47618052653576, -65.47618052653576,
              -157.47618052653576, -49.47618052653576, -140.47618052653576,
              -27.476180526535757, -119.47618052653576, -22.476180526535757,
              -92.47618052653576, -33.47618052653576, -46.47618052653576,
              -43.47618052653576, -26.476180526535757, -62.47618052653576,
              -10.476180526535757, -70.47618052653576, -0.4761805265357566,
              -87.47618052653576, 31.523819473464243, -89.47618052653576,
              36.52381947346424, -87.47618052653576, 43.52381947346424,
              -80.47618052653576, 45.52381947346424, -65.47618052653576,
              31.523819473464243, -46.47618052653576, 16.523819473464243,
              -17.476180526535757, 6.523819473464243, 3.5238194734642434,
              -39.47618052653576, 41.52381947346424, -68.47618052653576,
              59.52381947346424, -72.47618052653576, 59.52381947346424,
              -59.47618052653576, 128.52381947346424, 429.52381947346424,
              393.52381947346424, -207.47618052653576, -218.47618052653576,
              -30.476180526535757, -68.47618052653576, 80.52381947346424,
              -39.47618052653576, 105.52381947346424, 1.5238194734642434,
              50.52381947346424, 28.523819473464243, 24.523819473464243,
              69.52381947346424, 18.523819473464243, 114.52381947346424,
              24.523819473464243, 167.52381947346424, 24.523819473464243,
              229.52381947346424, 28.523819473464243, 225.52381947346424,
              12.523819473464243, 163.52381947346424, -55.47618052653576,
              -4.476180526535757, -119.47618052653576, -67.47618052653576,
              -131.47618052653576, -88.47618052653576, -105.47618052653576,
              -110.47618052653576, -61.47618052653576, -117.47618052653576,
              -37.47618052653576, -117.47618052653576, -10.476180526535757,
              -105.47618052653576, 8.523819473464243, -97.47618052653576,
              15.523819473464243, -76.47618052653576, -1.4761805265357566,
              -58.47618052653576, -15.476180526535757, -26.476180526535757,
              -54.47618052653576, -10.476180526535757, -63.47618052653576,
              15.523819473464243, -71.47618052653576, 28.523819473464243,
              -79.47618052653576, 51.52381947346424, -83.47618052653576,
              49.52381947346424, -68.47618052653576, 69.52381947346424,
              -61.47618052653576, 66.52381947346424, -32.47618052653576,
              62.52381947346424, -37.47618052653576, 32.52381947346424,
              -35.47618052653576, -4.476180526535757, -7.476180526535757,
              -45.47618052653576, 27.523819473464243, -68.47618052653576,
              171.52381947346424, 362.52381947346424, 376.52381947346424,
              -267.47618052653576, -131.47618052653576, -118.47618052653576,
              51.52381947346424, -62.47618052653576, 85.52381947346424,
              -37.47618052653576, 95.52381947346424, -11.476180526535757,
              -30.476180526535757, 98.52381947346424, -24.476180526535757,
              107.52381947346424, -4.476180526535757, 154.52381947346424,
              8.523819473464243, 210.52381947346424, 31.523819473464243,
              225.52381947346424, 76.52381947346424, 188.52381947346424,
              33.52381947346424, 25.523819473464243, -53.47618052653576,
              -109.47618052653576, -88.47618052653576, -157.47618052653576,
              -72.47618052653576, -157.47618052653576, -55.47618052653576,
              -135.47618052653576, -39.47618052653576, -115.47618052653576,
              -37.47618052653576, -70.47618052653576, -49.47618052653576,
              -43.47618052653576, -55.47618052653576, -31.476180526535757,
              -72.47618052653576, -22.476180526535757, -65.47618052653576,
              -5.476180526535757, -79.47618052653576, -6.476180526535757,
              -70.47618052653576, 24.523819473464243, -79.47618052653576,
              33.52381947346424, -80.47618052653576, 53.52381947346424,
              -75.47618052653576, 53.52381947346424, -66.47618052653576,
              43.52381947346424, -44.47618052653576, 33.52381947346424,
              -9.476180526535757, -4.476180526535757, -2.4761805265357566,
              -41.47618052653576, 15.523819473464243, -63.47618052653576,
              54.52381947346424, -70.47618052653576, 68.52381947346424,
              -10.476180526535757, 547.5238194734643, 364.52381947346424,
              -201.47618052653576, -232.47618052653576, -97.47618052653576,
              21.523819473464243, -30.476180526535757, 97.52381947346424,
              -35.47618052653576, 134.52381947346424, -31.476180526535757,
              137.52381947346424, 2.5238194734642434, 105.52381947346424,
              88.52381947346424, 95.52381947346424, 145.52381947346424,
              38.52381947346424, 218.52381947346424, 54.52381947346424,
              237.52381947346424, 41.52381947346424, 192.52381947346424,
              -14.476180526535757, 28.523819473464243, -98.47618052653576,
              -70.47618052653576, -135.47618052653576, -100.47618052653576,
              -113.47618052653576, -114.47618052653576, -79.47618052653576,
              -119.47618052653576, -45.47618052653576, -124.47618052653576,
              -28.476180526535757, -115.47618052653576, -2.4761805265357566,
              -104.47618052653576, 6.523819473464243, -83.47618052653576,
              -5.476180526535757, -54.47618052653576, -37.47618052653576,
              -24.476180526535757, -75.47618052653576, -1.4761805265357566,
              -78.47618052653576, 23.523819473464243, -84.47618052653576,
              46.52381947346424, -75.47618052653576, 50.52381947346424,
              -62.47618052653576, 34.52381947346424, -27.476180526535757,
              10.523819473464243, 31.523819473464243, -35.47618052653576,
              21.523819473464243, -58.47618052653576, 24.523819473464243,
              -54.47618052653576, 37.52381947346424, -71.47618052653576,
              244.52381947346424, 468.52381947346424, 385.52381947346424,
              -280.47618052653576, -193.47618052653576, -76.47618052653576,
              -19.476180526535757, 41.52381947346424, -0.4761805265357566,
              68.52381947346424, -10.476180526535757, 106.52381947346424,
              -22.476180526535757, 146.52381947346424, -23.476180526535757,
              159.52381947346424, -5.476180526535757, 185.52381947346424,
              38.52381947346424, 206.52381947346424, 111.52381947346424,
              172.52381947346424, 144.52381947346424, 106.52381947346424,
              108.52381947346424, -55.47618052653576, -23.476180526535757,
              -141.47618052653576, -76.47618052653576, -170.47618052653576,
              -71.47618052653576, -159.47618052653576, -54.47618052653576,
              -144.47618052653576, -40.47618052653576, -110.47618052653576,
              -41.47618052653576, -65.47618052653576, -48.47618052653576,
              -41.47618052653576, -59.47618052653576, -41.47618052653576,
              -65.47618052653576, -20.476180526535757, -67.47618052653576,
              -19.476180526535757, -83.47618052653576, 5.523819473464243,
              -88.47618052653576, 25.523819473464243, -91.47618052653576,
              37.52381947346424, -80.47618052653576, 33.52381947346424,
              -55.47618052653576, 1.5238194734642434, -7.476180526535757,
              -18.476180526535757, 14.523819473464243, -24.476180526535757,
              59.52381947346424, -48.47618052653576, 54.52381947346424,
              -74.47618052653576, 50.52381947346424, -76.47618052653576,
              55.52381947346424, -71.47618052653576, 60.52381947346424,
              1.5238194734642434, 564.5238194734643, 302.52381947346424,
              -194.47618052653576, -233.47618052653576, -68.47618052653576,
              -23.476180526535757, 124.52381947346424, -15.476180526535757,
              134.52381947346424, 25.523819473464243, 151.52381947346424,
              92.52381947346424, 164.52381947346424, 133.52381947346424,
              121.52381947346424, 142.52381947346424, 50.52381947346424,
              38.52381947346424, -81.47618052653576, -55.47618052653576,
              -149.47618052653576, -75.47618052653576, -162.47618052653576,
              -63.47618052653576, -154.47618052653576, -44.47618052653576,
              -131.47618052653576, -37.47618052653576, -93.47618052653576,
              -43.47618052653576, -44.47618052653576, -58.47618052653576,
              -37.47618052653576, -72.47618052653576, -0.4761805265357566,
              -83.47618052653576, 8.523819473464243, -89.47618052653576,
              19.523819473464243, -88.47618052653576, 33.52381947346424,
              -76.47618052653576, 33.52381947346424, -55.47618052653576,
              -11.476180526535757, -33.47618052653576, -20.476180526535757,
              -11.476180526535757, -22.476180526535757, 21.523819473464243,
              -41.47618052653576, 41.52381947346424, -52.47618052653576,
              89.52381947346424, -72.47618052653576, 56.52381947346424,
              -75.47618052653576, 56.52381947346424, -70.47618052653576,
              55.52381947346424, -57.47618052653576, 41.52381947346424,
              -1.4761805265357566, 427.52381947346424, 437.52381947346424,
              -194.47618052653576, -194.47618052653576, -104.47618052653576,
              3.5238194734642434, -49.47618052653576, 84.52381947346424,
              -54.47618052653576, 110.52381947346424, -30.476180526535757,
              85.52381947346424, -2.4761805265357566, 75.52381947346424,
              37.52381947346424, 41.52381947346424, 133.52381947346424,
              36.52381947346424, 169.52381947346424, 31.523819473464243,
              224.52381947346424, 18.523819473464243, 195.52381947346424,
              -14.476180526535757, 66.52381947346424, -87.47618052653576,
              -49.47618052653576, -128.47618052653576, -98.47618052653576,
              -118.47618052653576, -115.47618052653576, -87.47618052653576,
              -113.47618052653576, -55.47618052653576, -118.47618052653576,
              -17.476180526535757, -115.47618052653576, -1.4761805265357566,
              -104.47618052653576, 7.523819473464243, -104.47618052653576,
              6.523819473464243, -85.47618052653576, 2.5238194734642434,
              -70.47618052653576, -19.476180526535757, -31.476180526535757,
              -40.47618052653576, -10.476180526535757, -65.47618052653576,
              25.523819473464243, -83.47618052653576, 45.52381947346424,
              -72.47618052653576, 37.52381947346424, -61.47618052653576,
              37.52381947346424, -43.47618052653576, 42.52381947346424,
              -10.476180526535757, 10.523819473464243, 14.523819473464243,
              -59.47618052653576, 21.523819473464243, -66.47618052653576,
              41.52381947346424, -70.47618052653576, 50.52381947346424,
              31.523819473464243, 582.5238194734643, 208.52381947346424,
              -202.47618052653576, -200.47618052653576, -57.47618052653576,
              -7.476180526535757, -13.476180526535757, 43.52381947346424,
              -18.476180526535757, 82.52381947346424, -22.476180526535757,
              115.52381947346424, -30.476180526535757, 136.52381947346424,
              -11.476180526535757, 169.52381947346424, 3.5238194734642434,
              198.52381947346424, 50.52381947346424, 227.52381947346424,
              85.52381947346424, 211.52381947346424, 103.52381947346424,
              125.52381947346424, 8.523819473464243, -41.47618052653576,
              -80.47618052653576, -111.47618052653576, -102.47618052653576,
              -140.47618052653576, -81.47618052653576, -150.47618052653576,
              -57.47618052653576, -137.47618052653576, -32.47618052653576,
              -123.47618052653576, -14.476180526535757, -113.47618052653576,
              -4.476180526535757, -98.47618052653576, -5.476180526535757,
              -79.47618052653576, -10.476180526535757, -49.47618052653576,
              -24.476180526535757, -33.47618052653576, -48.47618052653576,
              -9.476180526535757, -80.47618052653576, 34.52381947346424,
              -84.47618052653576, 41.52381947346424, -72.47618052653576,
              56.52381947346424, -63.47618052653576, 43.52381947346424,
              -13.476180526535757, 32.52381947346424, -17.476180526535757,
              -17.476180526535757, -4.476180526535757, -55.47618052653576,
              45.52381947346424, -68.47618052653576, 43.52381947346424,
              -63.47618052653576, 264.52381947346424, 438.52381947346424,
              379.52381947346424, -292.47618052653576, -179.47618052653576,
              -135.47618052653576, 43.52381947346424, -28.476180526535757,
              79.52381947346424, 31.523819473464243, 69.52381947346424,
              43.52381947346424, 43.52381947346424, 90.52381947346424,
              14.523819473464243, 129.52381947346424, 10.523819473464243,
              168.52381947346424, 25.523819473464243, 214.52381947346424,
              51.52381947346424, 241.52381947346424, 45.52381947346424,
              214.52381947346424, 10.523819473464243, 59.52381947346424,
              -59.47618052653576, -84.47618052653576, -98.47618052653576,
              -154.47618052653576, -76.47618052653576, -154.47618052653576,
              -53.47618052653576, -146.47618052653576, -32.47618052653576,
              -126.47618052653576, -27.476180526535757, -85.47618052653576,
              -24.476180526535757, -71.47618052653576, -45.47618052653576,
              -31.476180526535757, -70.47618052653576, -9.476180526535757,
              -83.47618052653576, 3.5238194734642434, -87.47618052653576,
              24.523819473464243, -88.47618052653576, 28.523819473464243,
              -87.47618052653576, 49.52381947346424, -68.47618052653576,
              43.52381947346424, -53.47618052653576, 33.52381947346424,
              -35.47618052653576, 19.523819473464243, 18.523819473464243,
              -40.47618052653576, 45.52381947346424, -61.47618052653576,
              55.52381947346424, -72.47618052653576, 60.52381947346424,
              -67.47618052653576, 58.52381947346424, 56.52381947346424,
              556.5238194734643, 240.52381947346424, -249.47618052653576,
              -202.47618052653576, -85.47618052653576, 6.523819473464243,
              -32.47618052653576, 86.52381947346424, -32.47618052653576,
              125.52381947346424, -35.47618052653576, 136.52381947346424,
              -5.476180526535757, 119.52381947346424, 37.52381947346424,
              125.52381947346424, 81.52381947346424, 123.52381947346424,
              142.52381947346424, 127.52381947346424, 173.52381947346424,
              79.52381947346424, 179.52381947346424, -4.476180526535757,
              62.52381947346424, -110.47618052653576, -44.47618052653576,
              -157.47618052653576, -65.47618052653576, -154.47618052653576,
              -62.47618052653576, -120.47618052653576, -67.47618052653576,
              -83.47618052653576, -81.47618052653576, -33.47618052653576,
              -110.47618052653576, -14.476180526535757, -106.47618052653576,
              -0.4761805265357566, -94.47618052653576, 10.523819473464243,
              -81.47618052653576, 6.523819473464243, -61.47618052653576,
              -28.476180526535757, -28.476180526535757, -37.47618052653576,
              -13.476180526535757, -50.47618052653576, 7.523819473464243,
              -80.47618052653576, 33.52381947346424, -84.47618052653576,
              47.52381947346424, -76.47618052653576, 59.52381947346424,
              -66.47618052653576, 59.52381947346424, -18.476180526535757,
              36.52381947346424, -17.476180526535757, -7.476180526535757,
              -11.476180526535757, -43.47618052653576, 36.52381947346424,
              -63.47618052653576, 32.52381947346424, 6.523819473464243,
              634.5238194734643, 12.523819473464243, -246.47618052653576,
              -96.47618052653576, -62.47618052653576, 40.52381947346424,
              -49.47618052653576, 72.52381947346424, -53.47618052653576,
              92.52381947346424, -45.47618052653576, 118.52381947346424,
              -37.47618052653576, 129.52381947346424, -14.476180526535757,
              144.52381947346424, 14.523819473464243, 156.52381947346424,
              76.52381947346424, 160.52381947346424, 118.52381947346424,
              94.52381947346424, 164.52381947346424, -4.476180526535757,
              42.52381947346424, -109.47618052653576, -50.47618052653576,
              -162.47618052653576, -71.47618052653576, -163.47618052653576,
              -59.47618052653576, -136.47618052653576, -68.47618052653576,
              -101.47618052653576, -59.47618052653576, -74.47618052653576,
              -63.47618052653576, -49.47618052653576, -63.47618052653576,
              -26.476180526535757, -75.47618052653576, -4.476180526535757,
              -88.47618052653576, 6.523819473464243, -98.47618052653576,
              12.523819473464243, -96.47618052653576, 20.523819473464243,
              -85.47618052653576, 25.523819473464243, -67.47618052653576,
              29.523819473464243, -63.47618052653576, 7.523819473464243,
              -39.47618052653576, -6.476180526535757, -24.476180526535757,
              -20.476180526535757, 15.523819473464243, -20.476180526535757,
              24.523819473464243, -71.47618052653576, 51.52381947346424,
              -79.47618052653576, 60.52381947346424, -65.47618052653576,
              49.52381947346424, -45.47618052653576, 282.52381947346424,
              524.5238194734643, 245.52381947346424, -289.47618052653576,
              -174.47618052653576, -87.47618052653576, -9.476180526535757,
              23.523819473464243, -19.476180526535757, 95.52381947346424,
              -26.476180526535757, 114.52381947346424, -31.476180526535757,
              141.52381947346424, -24.476180526535757, 164.52381947346424,
              -2.4761805265357566, 176.52381947346424, 73.52381947346424,
              177.52381947346424, 125.52381947346424, 132.52381947346424,
              188.52381947346424, 36.52381947346424, 131.52381947346424,
              -79.47618052653576, -22.476180526535757, -148.47618052653576,
              -88.47618052653576, -135.47618052653576, -87.47618052653576,
              -109.47618052653576, -96.47618052653576, -67.47618052653576,
              -109.47618052653576, -40.47618052653576, -118.47618052653576,
              -11.476180526535757, -105.47618052653576, 1.5238194734642434,
              -94.47618052653576, 7.523819473464243, -71.47618052653576,
              -23.476180526535757, -44.47618052653576, -30.476180526535757,
              -24.476180526535757, -57.47618052653576, -5.476180526535757,
              -78.47618052653576, 36.52381947346424, -81.47618052653576,
              53.52381947346424, -79.47618052653576, 62.52381947346424,
              -70.47618052653576, 75.52381947346424, -35.47618052653576,
              69.52381947346424, -35.47618052653576, 23.523819473464243,
              -17.476180526535757, -11.476180526535757, -9.476180526535757,
              -41.47618052653576, 42.52381947346424, -6.476180526535757,
              494.52381947346424, 467.52381947346424, -118.47618052653576,
              -313.47618052653576, -84.47618052653576, -88.47618052653576,
              79.52381947346424, 3.5238194734642434, 19.523819473464243,
              97.52381947346424, -20.476180526535757, 146.52381947346424,
              -19.476180526535757, 162.52381947346424, -9.476180526535757,
              163.52381947346424, 68.52381947346424, 162.52381947346424,
              105.52381947346424, 156.52381947346424, 193.52381947346424,
              94.52381947346424, 199.52381947346424, -31.476180526535757,
              41.52381947346424, -114.47618052653576, -61.47618052653576,
              -140.47618052653576, -97.47618052653576, -114.47618052653576,
              -92.47618052653576, -85.47618052653576, -120.47618052653576,
              -40.47618052653576, -119.47618052653576, -17.476180526535757,
              -115.47618052653576, -2.4761805265357566, -102.47618052653576,
              7.523819473464243, -96.47618052653576, 8.523819473464243,
              -81.47618052653576, 3.5238194734642434, -65.47618052653576,
              20.523819473464243, 38.52381947346424, -59.47618052653576,
              88.52381947346424, -58.47618052653576, 80.52381947346424,
              -67.47618052653576, 56.52381947346424, -57.47618052653576,
              46.52381947346424, -37.47618052653576, 27.523819473464243,
              -4.476180526535757, 216.52381947346424, 631.5238194734643,
              10.523819473464243, -241.47618052653576, -179.47618052653576,
              -19.476180526535757, -62.47618052653576, 90.52381947346424,
              -49.47618052653576, 114.52381947346424, -40.47618052653576,
              116.52381947346424, -30.476180526535757, 131.52381947346424,
              -4.476180526535757, 111.52381947346424, 69.52381947346424,
              101.52381947346424, 131.52381947346424, 99.52381947346424,
              173.52381947346424, 77.52381947346424, 181.52381947346424,
              27.523819473464243, 133.52381947346424, -44.47618052653576,
              -14.476180526535757, -143.47618052653576, -61.47618052653576,
              -161.47618052653576, -68.47618052653576, -149.47618052653576,
              -55.47618052653576, -123.47618052653576, -48.47618052653576,
              -97.47618052653576, -45.47618052653576, -66.47618052653576,
              -52.47618052653576, -48.47618052653576, -59.47618052653576,
              -39.47618052653576, -50.47618052653576, -24.476180526535757,
              -63.47618052653576, -5.476180526535757, -88.47618052653576,
              21.523819473464243, -92.47618052653576, 29.523819473464243,
              -88.47618052653576, 36.52381947346424, -78.47618052653576,
              36.52381947346424, -62.47618052653576, 15.523819473464243,
              -43.47618052653576, 32.52381947346424, -45.47618052653576,
              5.523819473464243, -20.476180526535757, -2.4761805265357566,
              11.523819473464243, -7.476180526535757, 8.523819473464243,
              -43.47618052653576, 27.523819473464243, -61.47618052653576,
              55.52381947346424, -66.47618052653576, 38.52381947346424,
              -4.476180526535757, 323.52381947346424, 534.5238194734643,
              -72.47618052653576, -219.47618052653576, -120.47618052653576,
              1.5238194734642434, -48.47618052653576, 85.52381947346424,
              -46.47618052653576, 94.52381947346424, -14.476180526535757,
              63.52381947346424, 64.52381947346424, -7.476180526535757,
              102.52381947346424, -7.476180526535757, 147.52381947346424,
              1.5238194734642434, 202.52381947346424, 27.523819473464243,
              225.52381947346424, 18.523819473464243, 207.52381947346424,
              -0.4761805265357566, 106.52381947346424, -71.47618052653576,
              -37.47618052653576, -115.47618052653576, -83.47618052653576,
              -124.47618052653576, -93.47618052653576, -107.47618052653576,
              -106.47618052653576, -52.47618052653576, -120.47618052653576,
              -30.476180526535757, -117.47618052653576, -9.476180526535757,
              -104.47618052653576, 3.5238194734642434, -89.47618052653576,
              2.5238194734642434, -68.47618052653576, -11.476180526535757,
              -36.47618052653576, -30.476180526535757, -20.476180526535757,
              -61.47618052653576, -0.4761805265357566, -84.47618052653576,
              25.523819473464243, -84.47618052653576, 45.52381947346424,
              -79.47618052653576, 51.52381947346424, -59.47618052653576,
              51.52381947346424, -53.47618052653576, 43.52381947346424,
              -44.47618052653576, 19.523819473464243, 31.523819473464243,
              -20.476180526535757, 38.52381947346424, -67.47618052653576,
              46.52381947346424, -75.47618052653576, 55.52381947346424,
              -74.47618052653576, 60.52381947346424, -41.47618052653576,
              356.52381947346424, 531.5238194734643, -27.476180526535757,
              -265.47618052653576, -130.47618052653576, -35.47618052653576,
              -5.476180526535757, 46.52381947346424, -10.476180526535757,
              82.52381947346424, -20.476180526535757, 116.52381947346424,
              -28.476180526535757, 132.52381947346424, -22.476180526535757,
              156.52381947346424, -2.4761805265357566, 190.52381947346424,
              41.52381947346424, 211.52381947346424, 73.52381947346424,
              206.52381947346424, 101.52381947346424, 144.52381947346424,
              51.52381947346424, -23.476180526535757, -39.47618052653576,
              -115.47618052653576, -81.47618052653576, -158.47618052653576,
              -85.47618052653576, -149.47618052653576, -62.47618052653576,
              -137.47618052653576, -37.47618052653576, -127.47618052653576,
              -23.476180526535757, -117.47618052653576, -4.476180526535757,
              -101.47618052653576, -4.476180526535757, -80.47618052653576,
              -6.476180526535757, -58.47618052653576, -14.476180526535757,
              -53.47618052653576, -35.47618052653576, -15.476180526535757,
              -65.47618052653576, 12.523819473464243, -87.47618052653576,
              41.52381947346424, -81.47618052653576, 53.52381947346424,
              -67.47618052653576, 62.52381947346424, -49.47618052653576,
              68.52381947346424, -37.47618052653576, 47.52381947346424,
              -28.476180526535757, -5.476180526535757, 8.523819473464243,
              -44.47618052653576, 28.523819473464243, -46.47618052653576,
              33.52381947346424, 11.523819473464243, 494.52381947346424,
              463.52381947346424, -123.47618052653576, -311.47618052653576,
              -84.47618052653576, -87.47618052653576, 94.52381947346424,
              -39.47618052653576, 102.52381947346424, 8.523819473464243,
              82.52381947346424, 28.523819473464243, 59.52381947346424,
              115.52381947346424, 20.523819473464243, 150.52381947346424,
              27.523819473464243, 199.52381947346424, 38.52381947346424,
              241.52381947346424, 46.52381947346424, 240.52381947346424,
              59.52381947346424, 158.52381947346424, -27.476180526535757,
              -28.476180526535757, -79.47618052653576, -114.47618052653576,
              -100.47618052653576, -141.47618052653576, -85.47618052653576,
              -133.47618052653576, -66.47618052653576, -123.47618052653576,
              -48.47618052653576, -118.47618052653576, -18.476180526535757,
              -115.47618052653576, 2.5238194734642434, -93.47618052653576,
              -2.4761805265357566, -67.47618052653576, -36.47618052653576,
              -44.47618052653576, -52.47618052653576, -24.476180526535757,
              -59.47618052653576, -4.476180526535757, -81.47618052653576,
              42.52381947346424, -80.47618052653576, 19.523819473464243,
              -55.47618052653576, 8.523819473464243, -37.47618052653576,
              -2.4761805265357566, -10.476180526535757, -39.47618052653576,
              29.523819473464243, -48.47618052653576, 75.52381947346424,
              -62.47618052653576, 71.52381947346424, -74.47618052653576,
              55.52381947346424, -75.47618052653576, 53.52381947346424,
              -63.47618052653576, 51.52381947346424, -19.476180526535757,
              395.52381947346424, 503.52381947346424, -100.47618052653576,
              -240.47618052653576, -120.47618052653576, 5.523819473464243,
              -24.476180526535757, 73.52381947346424, -23.476180526535757,
              119.52381947346424, -37.47618052653576, 127.52381947346424,
              -23.476180526535757, 103.52381947346424, 36.52381947346424,
              105.52381947346424, 82.52381947346424, 107.52381947346424,
              127.52381947346424, 88.52381947346424, 201.52381947346424,
              50.52381947346424, 198.52381947346424, -0.4761805265357566,
              89.52381947346424, -91.47618052653576, -30.476180526535757,
              -143.47618052653576, -66.47618052653576, -150.47618052653576,
              -87.47618052653576, -102.47618052653576, -89.47618052653576,
              -61.47618052653576, -109.47618052653576, -40.47618052653576,
              -106.47618052653576, -22.476180526535757, -106.47618052653576,
              -1.4761805265357566, -105.47618052653576, 8.523819473464243,
              -96.47618052653576, -5.476180526535757, -61.47618052653576,
              -11.476180526535757, -55.47618052653576, -40.47618052653576,
              -37.47618052653576, -54.47618052653576, -7.476180526535757,
              -65.47618052653576, 16.523819473464243, -79.47618052653576,
              46.52381947346424, -75.47618052653576, 56.52381947346424,
              -68.47618052653576, 64.52381947346424, -59.47618052653576,
              63.52381947346424, -26.476180526535757, 43.52381947346424,
              -0.4761805265357566, -0.4761805265357566, -24.476180526535757,
              -31.476180526535757, 27.523819473464243, -59.47618052653576,
              47.52381947346424, -54.47618052653576, 369.52381947346424,
              460.52381947346424, -10.476180526535757, -319.47618052653576,
              -118.47618052653576, -105.47618052653576, 67.52381947346424,
              -48.47618052653576, 102.52381947346424, 82.52381947346424,
              -27.476180526535757, 116.52381947346424, -31.476180526535757,
              137.52381947346424, -0.4761805265357566, 147.52381947346424,
              37.52381947346424, 103.52381947346424, 145.52381947346424,
              120.52381947346424, 179.52381947346424, 84.52381947346424,
              185.52381947346424, 10.523819473464243, 92.52381947346424,
              -92.47618052653576, -33.47618052653576, -154.47618052653576,
              -75.47618052653576, -146.47618052653576, -88.47618052653576,
              -101.47618052653576, -109.47618052653576, -68.47618052653576,
              -109.47618052653576, -39.47618052653576, -117.47618052653576,
              -11.476180526535757, -104.47618052653576, -6.476180526535757,
              -71.47618052653576, -18.476180526535757, -49.47618052653576,
              -61.47618052653576, -15.476180526535757, -72.47618052653576,
              7.523819473464243, -80.47618052653576, 23.523819473464243,
              -80.47618052653576, 31.523819473464243, -83.47618052653576,
              33.52381947346424, -62.47618052653576, 25.523819473464243,
              -23.476180526535757, 3.5238194734642434, 33.52381947346424,
              -37.47618052653576, 43.52381947346424, -65.47618052653576,
              40.52381947346424, -70.47618052653576, 64.52381947346424,
              -65.47618052653576, 42.52381947346424, -46.47618052653576,
              275.52381947346424, 538.5238194734643, 129.52381947346424,
              -285.47618052653576, -207.47618052653576, -75.47618052653576,
              -19.476180526535757, 50.52381947346424, -1.4761805265357566,
              105.52381947346424, -17.476180526535757, 127.52381947346424,
              -17.476180526535757, 137.52381947346424, -15.476180526535757,
              160.52381947346424, 40.52381947346424, 169.52381947346424,
              103.52381947346424, 168.52381947346424, 154.52381947346424,
              145.52381947346424, 194.52381947346424, 42.52381947346424,
              127.52381947346424, -63.47618052653576, -15.476180526535757,
              -144.47618052653576, -71.47618052653576, -168.47618052653576,
              -75.47618052653576, -133.47618052653576, -70.47618052653576,
              -105.47618052653576, -62.47618052653576, -80.47618052653576,
              -65.47618052653576, -50.47618052653576, -70.47618052653576,
              -17.476180526535757, -94.47618052653576, -0.4761805265357566,
              -92.47618052653576, 5.523819473464243, -88.47618052653576,
              15.523819473464243, -83.47618052653576, 5.523819473464243,
              -54.47618052653576, -7.476180526535757, -33.47618052653576,
              -19.476180526535757, -6.476180526535757, -52.47618052653576,
              18.523819473464243, -58.47618052653576, 41.52381947346424,
              -67.47618052653576, 73.52381947346424, -48.47618052653576,
              71.52381947346424, -57.47618052653576, 20.523819473464243,
              -9.476180526535757, -27.476180526535757, 10.523819473464243,
              -53.47618052653576, 53.52381947346424, 47.52381947346424,
              576.5238194734643, 251.52381947346424, -202.47618052653576,
              -233.47618052653576, -37.47618052653576, -44.47618052653576,
              54.52381947346424, 12.523819473464243, 24.523819473464243,
              134.52381947346424, 89.52381947346424, 169.52381947346424,
              127.52381947346424, 155.52381947346424, 106.52381947346424,
              90.52381947346424, -7.476180526535757, -50.47618052653576,
              -74.47618052653576, -123.47618052653576, -92.47618052653576,
              -152.47618052653576, -68.47618052653576, -148.47618052653576,
              -49.47618052653576, -127.47618052653576, -30.476180526535757,
              -109.47618052653576, -24.476180526535757, -96.47618052653576,
              -26.476180526535757, -62.47618052653576, -32.47618052653576,
              -44.47618052653576, -36.47618052653576, -28.476180526535757,
              -54.47618052653576, -15.476180526535757, -67.47618052653576,
              6.523819473464243, -75.47618052653576, 12.523819473464243,
              -80.47618052653576, 33.52381947346424, -71.47618052653576,
              38.52381947346424, -62.47618052653576, 32.52381947346424,
              -44.47618052653576, -4.476180526535757, 5.523819473464243,
              -35.47618052653576, 68.52381947346424, -57.47618052653576,
              58.52381947346424, -65.47618052653576, 50.52381947346424,
              -53.47618052653576, 40.52381947346424, -35.47618052653576,
              19.523819473464243, 221.52381947346424, 572.5238194734643,
              6.523819473464243, -267.47618052653576, -136.47618052653576,
              -72.47618052653576, 40.52381947346424, -14.476180526535757,
              25.523819473464243, 23.523819473464243, -2.4761805265357566,
              95.52381947346424, -28.476180526535757, 124.52381947346424,
              -18.476180526535757, 147.52381947346424, -6.476180526535757,
              173.52381947346424, 75.52381947346424, 177.52381947346424,
              82.52381947346424, 182.52381947346424, 88.52381947346424,
              112.52381947346424, 3.5238194734642434, -39.47618052653576,
              -68.47618052653576, -113.47618052653576, -102.47618052653576,
              -126.47618052653576, -87.47618052653576, -124.47618052653576,
              -66.47618052653576, -123.47618052653576, -44.47618052653576,
              -119.47618052653576, -22.476180526535757, -109.47618052653576,
              -6.476180526535757, -88.47618052653576, -13.476180526535757,
              -80.47618052653576, -7.476180526535757, -65.47618052653576,
              -13.476180526535757, -62.47618052653576, -4.476180526535757,
              -52.47618052653576, -15.476180526535757, -17.476180526535757,
              -50.47618052653576, -2.4761805265357566, -66.47618052653576,
              32.52381947346424, -78.47618052653576, 38.52381947346424,
              -58.47618052653576, 33.52381947346424, -26.476180526535757,
              19.523819473464243, 1.5238194734642434, -20.476180526535757,
              24.523819473464243, -50.47618052653576, 23.523819473464243,
              -67.47618052653576, 38.52381947346424, -70.47618052653576,
              34.52381947346424, -2.4761805265357566, 481.52381947346424,
              332.52381947346424, -205.47618052653576, -248.47618052653576,
              -80.47618052653576, -14.476180526535757, -15.476180526535757,
              89.52381947346424, -31.476180526535757, 132.52381947346424,
              -18.476180526535757, 125.52381947346424, -10.476180526535757,
              131.52381947346424, 38.52381947346424, 111.52381947346424,
              105.52381947346424, 118.52381947346424, 162.52381947346424,
              98.52381947346424, 189.52381947346424, 77.52381947346424,
              177.52381947346424, -7.476180526535757, 69.52381947346424,
              -104.47618052653576, -62.47618052653576, -140.47618052653576,
              -100.47618052653576, -119.47618052653576, -122.47618052653576,
              -89.47618052653576, -106.47618052653576, -62.47618052653576,
              -118.47618052653576, -27.476180526535757, -106.47618052653576,
              -20.476180526535757, -94.47618052653576, -5.476180526535757,
              -75.47618052653576, -24.476180526535757, -46.47618052653576,
              -33.47618052653576, -41.47618052653576, -39.47618052653576,
              -22.476180526535757, -44.47618052653576, -9.476180526535757,
              -53.47618052653576, 18.523819473464243, -63.47618052653576,
              43.52381947346424, -63.47618052653576, 54.52381947346424,
              -63.47618052653576, 60.52381947346424, -44.47618052653576,
              86.52381947346424, -39.47618052653576, 49.52381947346424,
              -49.47618052653576,
            ],
            user_info: {
              email: "Nguyen",
              password: "Pham",
              user_id: "376-717-76",
            },
          };
          $window.localStorage[$scope.record_data.record_id] = JSON.stringify(
            $scope.record_data
          );
          jQuery("#loading_records_spinner").hide();
        }
        $scope.cancel_custom_timeout();
      }, 1600);
      $scope.selected_record = {
        name: "No records hovered",
        statistics: [0, 0, 0],
      };
      $scope.openLaboratory = function () {
        $scope.left_navigator_count = 0;
        $scope.hide_left_navigator();
        $window.open("laboratory.html", "_blank", "width=1024,height=680");
        // $scope.socket.emit("command_app_to_open_laboratory_as_new_window");
        // var win = new $scope.BrowserWindow({ width: 1024, height: 690 });
        // win.loadURL('www.google.com');
      };
    },
  ]);
