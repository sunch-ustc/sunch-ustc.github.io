from flask import Flask, render_template, request
import openai

app = Flask(__name__)

# TODO: 将OpenAI API的密钥替换为你自己的密钥
openai.api_key = "YOUR_API_KEY_HERE"

# 定义主页路由
@app.route("/")
def index():
    return render_template("index.html")

# 定义处理用户请求的路由
@app.route("/chatbot", methods=["POST"])
def chatbot():
    # 获取用户输入
    user_input = request.form["user_input"]
    
    # 获取之前的对话历史
    chat_history = request.form["chat_history"]
    if chat_history:
        chat_history = eval(chat_history)
    else:
        chat_history = []
    
    # 与OpenAI API进行交互，获取ChatGPT的响应
    response = openai.Completion.create(
        engine="davinci", prompt=user_input, max_tokens=60,
        temperature=0.5, n=1, stop=None,
        frequency_penalty=0, presence_penalty=0,
        context=chat_history
    )
    
    # 解析OpenAI API返回的响应，获取ChatGPT的回答
    answer = response.choices[0].text.strip()
    
    # 将当前的对话历史添加到总的对话历史中
    chat_history.append(answer)
    chat_history.append(user_input)
    
    # 将对话历史保存在隐藏域中，以便在下一次请求时使用
    chat_history_str = str(chat_history)
    
    # 返回响应给前端
    return answer, chat_history_str