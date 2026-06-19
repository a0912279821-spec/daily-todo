/**
 * Daily Todo — 每日任务清单
 *
 * 已实现：
 * - 添加任务
 * - 任务列表渲染
 * - 任务完成 / 取消完成切换
 * - 删除任务
 * - 总任务数和已完成数统计
 * - localStorage 本地保存
 */

(function () {
    "use strict";

    // 存储 key
    var STORAGE_KEY = "dailyTodoTasks";

    // DOM 元素
    var taskInput = document.getElementById("taskInput");
    var btnAdd = document.getElementById("btnAdd");
    var taskList = document.getElementById("taskList");
    var totalCountEl = document.getElementById("totalCount");
    var doneCountEl = document.getElementById("doneCount");

    // 状态：从 localStorage 加载
    var tasks = loadTasks();

    /**
     * 从 localStorage 加载任务列表
     * 如果数据异常则返回空数组，避免页面报错
     */
    function loadTasks() {
        try {
            var data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            // JSON 解析失败，忽略
        }
        return [];
    }

    /**
     * 保存任务列表到 localStorage
     */
    function saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

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

            var span = document.createElement("span");
            span.className = "task-text";
            span.textContent = task.text;

            var delBtn = document.createElement("button");
            delBtn.className = "btn-delete";
            delBtn.textContent = "删除";

            delBtn.addEventListener("click", createDeleteHandler(task.id));

            li.appendChild(span);
            li.appendChild(delBtn);

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
            saveTasks();
            renderTasks();
            updateStats();
        };
    }

    /**
     * 创建删除处理函数
     */
    function createDeleteHandler(taskId) {
        return function (event) {
            event.stopPropagation();

            tasks = tasks.filter(function (task) {
                return task.id !== taskId;
            });

            saveTasks();
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

        saveTasks();
        renderTasks();
        updateStats();
        taskInput.value = "";
    }

    // 页面初始化：渲染已有任务
    renderTasks();
    updateStats();

    // 绑定事件
    btnAdd.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

})();
