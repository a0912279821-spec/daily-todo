/**
 * Daily Todo — 每日任务清单
 *
 * 已实现：
 * - 添加任务
 * - 任务列表渲染
 * - 任务完成 / 取消完成切换
 * - 总任务数和已完成数统计
 *
 * 待实现：
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

        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var li = document.createElement("li");
            li.className = "task-item";

            // 已完成任务添加样式
            if (task.done) {
                li.classList.add("task-done");
            }

            li.textContent = task.text;

            // 绑定点击事件：切换完成状态
            li.addEventListener("click", createToggleHandler(task.id));

            taskList.appendChild(li);
        }
    }

    /**
     * 创建点击切换处理函数
     * 点击后根据 task.id 找到对应任务，切换 done 状态
     */
    function createToggleHandler(taskId) {
        return function () {
            // 找到对应任务
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === taskId) {
                    // 切换完成状态
                    tasks[i].done = !tasks[i].done;
                    break;
                }
            }
            // 重新渲染
            renderTasks();
            updateStats();
        };
    }

    /**
     * 更新统计数字
     */
    function updateStats() {
        totalCountEl.textContent = tasks.length;

        // 统计已完成任务数量
        var doneCount = 0;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].done) {
                doneCount += 1;
            }
        }
        doneCountEl.textContent = doneCount;
    }

    /**
     * 添加新任务
     */
    function addTask() {
        var text = taskInput.value.trim();

        if (text === "") {
            return;
        }

        var task = {
            id: Date.now(),
            text: text,
            done: false
        };
        tasks.push(task);

        renderTasks();
        updateStats();
        taskInput.value = "";
    }

    // 绑定事件
    btnAdd.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

})();
