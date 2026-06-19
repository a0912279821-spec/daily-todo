/**
 * Daily Todo — 每日任务清单
 *
 * 已实现：
 * - 添加任务
 * - 任务列表渲染
 * - 任务完成 / 取消完成切换
 * - 删除任务
 * - 总任务数和已完成数统计
 *
 * 待实现：
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
        taskList.innerHTML = "";

        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var li = document.createElement("li");
            li.className = "task-item";

            if (task.done) {
                li.classList.add("task-done");
            }

            // 任务文本
            var span = document.createElement("span");
            span.className = "task-text";
            span.textContent = task.text;

            // 删除按钮
            var delBtn = document.createElement("button");
            delBtn.className = "btn-delete";
            delBtn.textContent = "删除";

            // 删除按钮阻止冒泡，避免触发完成切换
            delBtn.addEventListener("click", createDeleteHandler(task.id));

            li.appendChild(span);
            li.appendChild(delBtn);

            // li 点击切换完成状态
            li.addEventListener("click", createToggleHandler(task.id));

            taskList.appendChild(li);
        }
    }

    /**
     * 创建完成状态切换处理函数
     */
    function createToggleHandler(taskId) {
        return function () {
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === taskId) {
                    tasks[i].done = !tasks[i].done;
                    break;
                }
            }
            renderTasks();
            updateStats();
        };
    }

    /**
     * 创建删除处理函数
     * 使用 stopPropagation 防止触发 li 的完成切换
     */
    function createDeleteHandler(taskId) {
        return function (event) {
            event.stopPropagation();

            // 过滤掉要删除的任务
            tasks = tasks.filter(function (task) {
                return task.id !== taskId;
            });

            renderTasks();
            updateStats();
        };
    }

    /**
     * 更新统计数字
     */
    function updateStats() {
        totalCountEl.textContent = tasks.length;

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
