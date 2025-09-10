  
      var cursor = document.querySelector(".cursor"),
      follower = document.querySelector(".cursor-follower");

      var posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

      TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
          posX += (mouseX - posX) / 9;
          posY += (mouseY - posY) / 9;

          TweenMax.set(follower, {
            css: {
              left: posX - 20,
              top: posY - 20,
            },
          });

          TweenMax.set(cursor, {
            css: {
              left: mouseX,
              top: mouseY,
            },
          });
        },
      });

      document.addEventListener("mousemove", function (e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      });

      document.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("mouseenter", function () {
      cursor.classList.add("active");
      follower.classList.add("active");
    });

    link.addEventListener("mouseleave", function () {
      cursor.classList.remove("active");
      follower.classList.remove("active");
    });

  });

    
    