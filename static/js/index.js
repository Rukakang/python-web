//初始化bootstrap-table的内容
function InitMainTable () {
    //记录页面bootstrap-table全局变量$table，方便应用
    var queryUrl = '/example';
    $table = $('#table').bootstrapTable({
        url: queryUrl,                      //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        toolbar: '#toolbar',              //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        //pageSize: rows,                     //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        //得到查询的参数
        queryParams : function (params) {
            //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            var temp = {
                rows: params.limit,                         //页面大小
                page: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名
                sortOrder: params.order //排位命令（desc，asc）
            };
            return temp;
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, {
            field: 'name',
            title: '姓名',
            sortable: true
        }, {
            field: 'mobile',
            title: '手机',
            sortable: true
        }, {
            field: 'gender',
            title: '性别',
            sortable: true
        }, /* {
            field:'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            //formatter: actionFormatter
        }, */],
        onLoadSuccess: function (data) {
            console.log(eval(data));
        },
        onLoadError: function () {
            showTips("数据加载失败！");
        },
        onDblClickRow: function (row, $element) {
            var id = row.ID;
            EditViewById(id, 'view');
        },
    });
};
InitMainTable ();

const ajaxPromise =  param => {
  return new Promise((resolve, reject) => {
    $.ajax({
      "type":param.type || "get",
      "async":param.async || true,
      "url":param.url,
      "data":param.data || "",
      "dataType": "json",
      "success": res => {
        resolve(res);
      },
      "error": err => {
        reject(err);
      }
    })
  })
}

let conQuery = function(data){

}




$(function(){
    let n =0 ;
    $(".detailTest").click(function(){
        //location.href='test';
        history.pushState({},'','/test');

        window.addEventListener('popstate', function(e) {
            console.log(e)
        })
    })

    $("#add").click(function(){
        let select0 = $("#select0").val();
        let select1 = $("#select1").val();
        let select2 = $("#select2").val();
        //加个自增id

        let tempNode = `<div class= 'content-node node${n}'><span>${select0}</span><span>${select1}</span><span>${select2}</span>
        打架了巨大浪费打两份简历上的飞机啊类毒素解放拉萨大家两地分居案例的设计费拉萨大家发
        打架了巨大浪费打两份简历上的飞机啊类毒素解放拉萨大家两地分居案例的设计费拉萨大家发</div>
        <button id = detailButton${n} class=detail>明细</button>
        <button id = modifyButton${n} class=modifyButton$>修改</button>
        <button id = nodeButton${n} class=deleteButton>删除</button>`;
        $(".content-nodes").append(tempNode);

        let checkBool = false;
       $(`.node${n}`).on("click",function(){
                console.log(`node${n}`);
                if(!checkBool){
                    $(`.node${n}`).addClass("active");
                    checkBool = true;
                }else{
                    $(`.node${n}`).removeClass("active");
                    checkBool = false;
                }




       })
       $(".deleteButton").on("click",function(){
           let id  = $(this).attr("id");
           let num =id.substring(id.length-1);
           $(`.node${num}`).remove();
            $(this).remove();
       })

    })

    let step1 = () => {
        ajaxPromise({
          "url":"/condition",
        }).then(res => {
            　$.each(res, function (i) {
            　　　　$('#select1').append("<option value=" + res[i] + ">" + res[i] + "</option>");
                    $('#select1').selectpicker('refresh');
            　});
            //step2(res);
        }).catch(err => {
            console.log("查询失败");
        })
    }
    step1();
    /*let step2 = (res) => {
            ajaxPromise({
              "type":"get",
              "url":"",
              "data":{"name":res}
            }).then(res => {
                console.log("第二个请求正确返回==>"+res);
            }).catch(err => {
                console.log("第二个请求失败==>"+err);
            })
        }

    })*/
    //级联
     $("#select1").change(function(){
          //根据bUnit去获取Division
          ajaxPromise({
              "url": '/condition',
              "data":[]
          }).then(
            data =>{

                  $("#select2").attr("disabled",false)
                   if(data.length == 0){
                   //如果一级没有对应的二级 则清空二级并 不往下执行
                   //每次拼接前都进行清空
                        $("#select2").empty();
                       $("#select2").selectpicker("refresh");
                       return ;
                   }
                   //如果一级有对应的二级 则进行拼接
                   //每次拼接前都进行清空
                   $("#select2").empty();
                   for(var i=0;i<data.length;i++){
                        $("#select2").append("<option value='"+data[i]+"'>"+data[i]+"</option>");
                   }
                   //这里千万别忘记了
                   $("#select2").selectpicker("refresh");
            }
          );
    });

    //赋值时触发change事件
    //$('.selectpicker').selectpicker('val', '1').trigger("change");

    //分组
    //$("#select2").change(function(){
        $('#select2').on('changed.bs.select',function () {
		$('#select0').val($('#select2').val());
        ajaxPromise({
              "url": '/condition',
              "data":[]
          }).then(
            data =>{
            var html = "";
            for(i in data) {
            var NName = data[i];
            var device_name = data[i];
            html += '<optgroup data-max-options="1" label='+NName+'>';
            for(a in device_name){
             html += '<option  value='+NName+'>' + device_name+ '</option>';
            }
            html += '</optgroup>'
            }
              $('#select3').append(html);
                    // 缺一不可
            $('#select3').selectpicker('refresh');
            $('#select3').selectpicker('render');

            }

          )
    });

    //默认选中
    /*success : function(data){
    　　var selected = new Array();
    　　$.each(JSON.parse(data), function (i,obj) {
    　　　　selected.push(obj.BASEID);
    　　});
    　　console.log("selected",selected)
    　　$('#usertype').selectpicker('val', selected);//默认选中
    　　$('#usertype').selectpicker('refresh');
    }*/
 });


