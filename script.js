$(document).ready(function() {
    // 当用户提交表单时，发送请求到后端处理用户请求
    $("#chat-form").submit(function(event) {
        event.preventDefault();
        var user_input = $("#user-input").val();
        var chat_history = $("#chat-history").val();
        $.ajax({
            type: "POST",
            url: "\chatbot",
            data: { user_input: user_input, chat_history: chat_history },
            success: function(response, chat_history_str) {
                // 更新聊天记录和对话历史
                $("#chatlog").append("<div class='user-message'>" + user_input + "</div>");
                $("#chatlog").append("<div class='chatbot-message'>" + response + "</div>");
                $("#user-input").val("");
                $("#chat-history").val(chat_history_str);
                // 滚动到底部
                $("#chatlog").scrollTop($("#chatlog")[0].scrollHeight);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    });
});