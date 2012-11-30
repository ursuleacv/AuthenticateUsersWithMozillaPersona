(function(window, $, undefined) {
    // See: http://www.quirksmode.org/js/cookies.html
    window.readCookie = function(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };

    // Read auth info (the email address) from cookie
    var currentUser = window.readCookie('auth');

    // If the user is not logged in set the default to null
    if (!currentUser) {
        currentUser = null;
    }

    // The returned value must be URL-decoded
    if (currentUser != null) {
        currentUser = decodeURIComponent(currentUser);
    }

    navigator.id.watch({
        loggedInUser: currentUser,
        onlogin: function(assertion) {
            // A user has logged in! Here you need to send the
            // assertion to your backend for verification and to
            // create a session and then update your UI.
            $.ajax({
                type: 'POST',
                url: 'login.php', // This is a URL on your website.
                data: {assertion: assertion},
                success: function(res, status, xhr) {
                    window.location.reload();
                },
                error: function(xhr, status, err) {
                    alert('Login failure: ' + err);
                }
            });
        },
        onlogout: function() {
            // A user has logged out! Here you need to tear down the
            // user's session by redirecting the user or making a call
            // to your backend. Also, make sure loggedInUser will get
            // set to null on the next page load.
            $.ajax({
                type: 'POST',
                url: 'logout.php', // This is a URL on your website.
                success: function(res, status, xhr) {
                    window.location.reload();
                },
                error: function(xhr, status, err) {
                    alert('Logout failure: ' + err);
                }
            });
        }
    });

    $(document).ready(function(){

        $('a.persona-signin').click(function(e) {
            navigator.id.request();
            e.preventDefault();
        });
        $('a.persona-signout').click(function(e) {
            navigator.id.logout();
            e.preventDefault();
        });
    });
})(window, jQuery);