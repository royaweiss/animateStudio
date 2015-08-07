if (Meteor.isClient) {  

    var styleSheets = new Array();

    Template.mainTemplate.helpers({

        cssCategories: [
            {opt: "transition"},
            {opt: "transform"},
            {opt: "animation"},
            {opt: "filter"},
            {opt: "example"}
        ], 

        transitions: [
            {opt: "background-color"},
            {opt: "background-position"},
            {opt: "border-bottom-color"},
            {opt: "border-bottom-width"},
            {opt: "border-left-color"},
            {opt: "border-left-width"},
            {opt: "border-right-color"},
            {opt: "border-right-width"},
            {opt: "border-spacing"},
            {opt: "border-top-color"},
            {opt: "border-top-width"},
            {opt: "bottom"},
            {opt: "clip"},
            {opt: "color"},
            {opt: "font-size"},
            {opt: "font-weight"},
            {opt: "height"},
            {opt: "left"},
            {opt: "letter-spacing"},
            {opt: "line-height"},
            {opt: "margin-bottom"},
            {opt: "margin-left"},
            {opt: "margin-right"},
            {opt: "margin-top"},
            {opt: "max-height"},
            {opt: "max-width"},
            {opt: "min-height"},
            {opt: "min-width"},
            {opt: "opacity"},
            {opt: "outline-color"},
            {opt: "outline-width"},
            {opt: "padding-bottom"},
            {opt: "padding-left"},
            {opt: "padding-right"},
            {opt: "padding-top"},
            {opt: "right"},
            {opt: "text-indent"},
            {opt: "text-shadow"},
            {opt: "top"},
            {opt: "vertical-align"},
            {opt: "visibility"},
            {opt: "width"},
            {opt: "word-spacing"},
            {opt: "z-index"}
        ],

        transforms: [
            {opt: " -webkit-transform: translate"},
            {opt: " -webkit-transform: rotate"},
            {opt: " -webkit-transform: scale"},
            {opt: " -webkit-transform: skewX"},
            {opt: " -webkit-transform: skewY"},
            {opt: " -webkit-transform: rotateX"},
            {opt: " -webkit-transform: rotateY"},
            {opt: " -webkit-transform: matrix"}
        ],


        filters: [
            {opt: "blur"}, 
            {opt: "brightness"}, 
            {opt: "contrast"},
            {opt: "drop-shadow"},
            {opt: "grayscale"},
            {opt: "hue-rotate"},
            {opt: "invert"},
            {opt: "opacity"},
            {opt: "saturate"},
            {opt: "sepia"},
            {opt: "url"},
            {opt: "custom"}
        ],        

        examples: [
            {opt: "colorLeft"},
            {opt: "colorLeft"},
            {opt: "animation"},
            {opt: "filter"}
        ]        
    });


    Template.animation.helpers({
        transitions: [
            {opt: "background-color"},
            {opt: "background-position"},
            {opt: "border-bottom-color"},
            {opt: "border-bottom-width"},
            {opt: "border-left-color"},
            {opt: "border-left-width"},
            {opt: "border-right-color"},
            {opt: "border-right-width"},
            {opt: "border-spacing"},
            {opt: "border-top-color"},
            {opt: "border-top-width"},
            {opt: "bottom"},
            {opt: "clip"},
            {opt: "color"},
            {opt: "font-size"},
            {opt: "font-weight"},
            {opt: "height"},
            {opt: "left"},
            {opt: "letter-spacing"},
            {opt: "line-height"},
            {opt: "margin-bottom"},
            {opt: "margin-left"},
            {opt: "margin-right"},
            {opt: "margin-top"},
            {opt: "max-height"},
            {opt: "max-width"},
            {opt: "min-height"},
            {opt: "min-width"},
            {opt: "opacity"},
            {opt: "outline-color"},
            {opt: "outline-width"},
            {opt: "padding-bottom"},
            {opt: "padding-left"},
            {opt: "padding-right"},
            {opt: "padding-top"},
            {opt: "right"},
            {opt: "text-indent"},
            {opt: "text-shadow"},
            {opt: "top"},
            {opt: "vertical-align"},
            {opt: "visibility"},
            {opt: "width"},
            {opt: "word-spacing"},
            {opt: "z-index"}
        ],
    });
    

    Template.mainTemplate.events({
          'change #cssCategory': function () {            
              makeSelectsDisappear();
              cssCategory = $('#cssCategory').val();

              //Display the Subcategory Select
              $("#" + cssCategory).css("display", "inline-block");

              $('img').css('display', 'none');
              if(cssCategory == "filter") {
                  $('img').css('display', 'inline-block');
              }
          },

          // Some Deault Values for transition Subcategories
          'change #transition': function () {            
              var val = $( "#transition option:selected" ).text();

              if (val == 'color') {
                  $('#transitionEndValue').val('red');
              }
              if (val == 'background-color') {
                  $('#transitionEndValue').val('coral');
              }
              if (val == 'left') {
                  $('#transitionEndValue').val('300px');
              }
          }, 

          // Some Deault Values for transform Subcategories
          'change #transform': function () {
              var val = $( "#transform option:selected" ).text();

              if ( (val == 'rotate') || (val == 'skewX') || (val == 'skewY') ) {
                  $('#transitionEndValue').val('(45deg)');
              } 
              if (val == 'translate') {
                  $('#transitionEndValue').val('(100px, 100px)');
              }              
          }, 

          'change #example': function () {               
              var val = $( "#example option:selected" ).text();
              alert("val: " + val);

              var exSheet = colorLeft();
              $('#cssSyleSheet').text(exSheet);

          },  

          // Generate Style Rule from Select and Text Controls
          'click #btn-submit': function () {            
              var selValue = $('#' + cssCategory).val();
              var transitionEndValue = $('#transitionEndValue').val();

              var theStyle;
              if (cssCategory == "transform") {
                  theStyle =  " .newStyle{ " + selValue + " " + transitionEndValue + ";} ";                
              } 
              else {
                  theStyle =  " .newStyle{ " + selValue + ":" + transitionEndValue + ";} ";
              }
              createClass(theStyle);
          },          

          // Apply the Edited Stylesheet to the box div or image
          'click #btn-stylesheet': function () {            
              var editedStyle = $("#cssSyleSheet").val();
              editedStyle = $(editedStyle).appendTo("head");

              //cssCategory = $('#cssCategory').val();
              //if (cssCategory == "filter") {
              //    $("img").addClass('editedStyle');
              //} else {
                  $("#box").addClass('editedStyle');
              //}              
              styleSheets.push(editedStyle);
          },

          'oncontextmenu #btn-stylesheet': function () { 
              this.preventDefault;           
              alert("right click");
          }
    });

    Template.animation.events({
        'click #btn-animate': function () {            
            var property = $("#property option:selected").val();
            var initialValue = $("#initialValue").val();
            var endValue = $("#endValue").val();
            var seconds = $("#seconds option:selected").val();
            createAnimation(property, initialValue, endValue, seconds);
        }
    });
}

    
    
if (Meteor.isServer) {
    Meteor.startup(function () {
      // code to run on server at startup
    });
}

function makeSelectsDisappear() {
    $("#transition").css("display", "none");
    $("#transform").css("display", "none");
    $("#filter").css("display", "none");
    $("#example").css("display", "none");
}

// Generate a Stylesheet from the Generated Style Rules and Append to the Head of the Page
function createClass (theStyle) {

   theStyle = theStyle.replace(/\s/g, '');

    var newStyle = $("<style type='text/css'>" + theStyle + "</style>").appendTo("head");
    $("#box").addClass('newStyle');
    styleSheets.push(newStyle);

    //Change the Stylesheet Display to Show the New Stylesheet
    var styleSheetDisplay = "";
    var styleSheetDisplay = "<style type='text/css'>" + theStyle + "</style>";
    $("#cssSyleSheet").val(styleSheetDisplay);
}

function createAnimation(property, initialValue, endValue, seconds) {

    if (property.indexOf('transform') > 2) {
        
        var styleSheet = 
          "<style type='text/css'>" + "\n" +
              "#box" + "\n" +  
              "{" + "\n" + "\t" + 
                  "-webkit-transition: -webkit-transform " + seconds + " ease-in-out;" 
                  + "\n" + "\t" +
                  "transition: transform " + seconds + " ease-in-out;" + "\n" + 
              "}" + "\n" +
              "#box:hover" + "\n" + 
              "{" + "\n" + "\t" +   
                  property + endValue + ";" + "\n" +                   
              "}" + "\n" +
          "</style>";

          var theStyle =           
              "#box" +
              "{" + 
                  "-webkit-transition: -webkit-transform " + seconds + " ease-in-out;" 
                  + 
                  "transition: transform " + seconds + " ease-in-out;" + 
              "}" + 
              "#box:hover" + 
              "{" +    
                  property + endValue + ";" +                    
              "}";
    } 
    else {
        var styleSheet = 
          "<style type='text/css'>" + "\n" +
              "#box" + "\n" +  
              "{" + "\n" + "\t" + 
                  property + ": " + initialValue + ";" + "\n" + "\t" +
                  "transition: " + property + " " + seconds + ";" + "\n" + 
              "}" + "\n" +
              "#box:hover" + "\n" + 
              "{" + "\n" + "\t" +   
                  property + " : " + endValue + ";" + "\n" +
              "}" + "\n" +
          "</style>";

        var theStyle = 
          "#box" + 
          "{" +
              property + ": " + initialValue + ";" +
              "transition: " + property + " " + seconds + ";" +
          "}" +
          "#box:hover" + "{" + property + ": " + endValue + ";" + "}";
    }    

    var newStyle = $("<style type='text/css'>" + theStyle + "</style>").appendTo("head");
    $("#box").addClass('newStyle');    

    $("#cssSyleSheet").val(styleSheet);
    ("#box").addClass(newStyle);
    //$("img").addClass('newStyle');
}

function colorLeft() {            
    var colorLeftSheet =
        "<style type='text/css'>" + "\n" + 
        "#box" + "\n" +
        "{" + "\n" +  "\t" +
              "background-color: red;" + "\n" + "\t" +
              "left: 0px;" + "\n" +  "\t" +     
              "transition: background-color 2s, left 2s;" + "\n" +
        "}" + "\n" +
        "#box:hover" + "\n" +
        "{" + "\n" + "\t" +
          "background-color : gold;" + "\n" + "\t" +
          "left: 300px;" + "\n" + 
        "}" + "\n" +
        "</style>";   
        return colorLeftSheet;     
}            

Router.route('/', {
    template: 'mainTemplate'
});

Router.route('/animation', {
    template: 'animation'
});