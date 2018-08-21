$(document).ready(function(){
    $('a').hover(function(){
        $(this).find('h3').css('color','white');
    });
    $('a').mouseout(function(){
        $(this).find('h3').css('color','gray');
    });
    $('div.panel-body').each(function(user){
        var $this = $(this);
        console.dir($this);
        console.log($this.find('#user1').val());
        console.log('user 1 :' + $this.find('#user1').val());
        console.log('user 2 :' + $this.find('#user2').val());
        if($this.find('#user1').val() != $('#myId').val()){
          $this.find('h3').html($this.find('#user1').val() + '님 과의 대화방');
        } else{
            $this.find('h3').html($this.find('#user2').val() +'님 과의 대화방');
        } 
    });
})