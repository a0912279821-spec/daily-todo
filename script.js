/**
 * Daily Todo — 每日任务清单
 *
 * 已实现：
 * - 添加任务
 * - 任务列表渲染
 * - 总任务数统计
 *
 * 待实现：
 * - 标记完成 / 取消完成
 * - 删除任务
 * - localStorage 持久化
 */

(function () {
    "use strict";

    // DOM 元素
    var taskInput = document.getElementById("taskInput");
    var btnAdd = document.getElementById("btnAdd");
    var taskList = document.getElementById("taskList");
    var totalCountEl = document.getElementById("totalCount");
    var doneCountEl = document.getElementById("doneCount");

    // 状态
    var tasks = [];

    /**
     * 渲染任务列表到页面
     */
    function renderTasks() {
        // 清空列表
        taskList.innerHTML = "";

        // 遍历 tasks 数组，为每项创建 li
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var li = document.createElement("li");
            li.className = "task-item";
            li.textContent = task.text;
            taskList.appendChild(li);
        }
    }

    /**
     * 更新统计数字
     */
    function updateStats() {
        totalCountEl.textContent = tasks.length;
        // 已完成数量暂保持 0
        doneCountEl.textContent = 0;
    }

    /**
     * 添加新任务
     */
    function addTask() {
        // 获取输入内容并去除首尾空格
        var text = taskInput.value.trim();

        // 空内容不添加
        if (text === "") {
            return;
        }

        // 创建任务对象并加入数组
        var task = {
            id: Date.now(),
            text: text,
            done: false
        };
        tasks.push(task);

        // 更新页面
        renderTasks();
        updateStats();

        // 清空输入框
        taskInput.value = "";
    }

    // 绑定事件
    btnAdd.addEventListener("click", addTask);

    // 支持回车键添加任务
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

})();
