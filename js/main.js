$.fn.extend({
    marquee: function (obj) {
        let T = this;
        let offset = 20;
        let index = 0;
        let imgCount = $(this).children("img").length;
        $(this).children("img").hide().click(imgClick);
        $(this).children("img").eq(0).show();
        let divLeft = $(this)[0].clientLeft;
        let divTop = $(this)[0].clientTop;
        let divWidth = $(this)[0].clientWidth;
        let divHeight = $(this)[0].clientHeight;
        let baseCss = {
            "font-size": "80px",
            "color": "#74f564",
            "display": "inline-block",
            "position": "absolute",
            "left": "20px",
            "top": divTop + divHeight / 2,
            "cursor": "pointer",
            "paddint": "0",
            "margin": "0",
            "line-height": "0"
        };
        let leftDiv = $("<div></div>")
            .text("<")
            .css(baseCss).css({"left": divLeft + offset})
            .click(leftClick);
        let rightDiv = $("<div></div>")
            .text(">")
            .css(baseCss).css({"left": divLeft + divWidth - offset-50})
            .click(rightClick);
        this.append(leftDiv, rightDiv);

        function imgClick(obj) {
            let imgDiv = $("<div>")
                .attr("id", "imgDiv")
                .css({
                    "position": "absolute",
                    "left": "0",
                    "top": "0",
                    "margin": "0 auto",
                    "text-align":"center",
                    "width": $(document.body).outerWidth(true),
                    "height": $(document.body).outerHeight(true),
                });
            let cImg = $(T).children("img").eq(index).clone()
                .attr({
                    "width": $(document.body).outerWidth(true)-150,
                    "height": $(document.body).outerHeight(true)-120,
                })
                .click(function () {
                    $("#imgDiv").remove();
                });
            imgDiv.append(cImg);
            //图片最大化
            $("body").append(imgDiv);
        }

        function leftClick() {
            $(T).children("img").eq(index).hide(1000);
            //更新Index
            index = index === 0 ? imgCount - 1 : index - 1;
            $(T).children("img").eq(index).show(1000);
        }

        function rightClick() {
            $(T).children("img").eq(index).hide(1000);
            //更新Index
            index = index === imgCount - 1 ? 0 : index + 1;
            $(T).children("img").eq(index).show(1000);
        }
    }
});
$('#marquee').marquee();