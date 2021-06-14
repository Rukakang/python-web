from flask import Flask, request, render_template, redirect, url_for, abort, jsonify
import json

# 实例化一个Flask对象，
#     __name__是模块的名称或者包的名称
#     作用: 根据这个参数确定flask应用的路径， 从而快速查找模板和html文件的默认路径；
#     模块就是python文件; 包就是目录(跟普通目录多加一个__init__.py);
app = Flask(__name__)

# 基本路由:通过路由绑定一个视图函数
#   @app.route('/'): 告诉Flask哪个URL才能出发对应的函数， 又称为路由;
#   对应定义了一个视图函数， 也就是返回给用户浏览器显示的内容;

app = Flask(__name__, template_folder='templates', static_url_path='/static/')

app.config['DEBUG'] = True


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/example', methods=['POST', 'GET'])
def example():
    response = jsonify([{'name': 'ad', 'mobile': '12345678901', 'gender': '男'},
                        {'name': 'fw', 'mobile': '23456789012', 'gender': '女'}])
    response.status_code = 200
    return response


@app.route('/condition', methods=['POST', 'GET'])
def condition():
    s = ['process1', 'process2', 'process3']
    response = jsonify(s)
    response.status_code = 200
    return response


#  运行Flask应用， 可以指定ip和端口；
# '0.0.0.0' 所有的IP都可以访问到;

if __name__ == '__main__':
    app.run('0.0.0.0', 9000)
