$(function(){
    $.ajax({
        url:'https://www.easy-mock.com/mock/5b95f8d947452a5f62520ab5/example/getList',
		type:'get',
		success:function(result){
            console.log(result)
            $('#handle').html(template('banli',{data:result.data}));
		}
    });
    

    $.ajax({
        url:'https://www.easy-mock.com/mock/5b95f8d947452a5f62520ab5/example/news',
		type:'get',
		success:function(result){
            console.log(result)
            $('#new').html(template('xinwen',{data:result.data}));
		}
    })

    $.ajax({
        url:'https://www.easy-mock.com/mock/5b95f8d947452a5f62520ab5/example/getCon',
		type:'get',
		success:function(result){
            console.log(result)
            $('#abst').html(template('jianjie',{data:result.data}));
		}
    })

})