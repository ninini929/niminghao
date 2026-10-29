---
name: git-push-github
description: Commit all changes and push this project to the GitHub repo ninini929/niminghao over SSH. Use when the user says 提交到github, 提交并推送github, push to github, 同步代码到GitHub. Do not use for Gitee or other repositories.
---

# 提交到 GitHub

将本项目全部改动 commit 并 push 到 GitHub 仓库 `ninini929/niminghao`，使用已配置的 SSH 公钥认证（不涉及任何令牌）。

## 执行步骤

1. 将当前工作目录切换为项目根目录（本 skill 所在项目的根）。
2. 运行预检（可选）：`powershell -ExecutionPolicy Bypass -File .trae\skills\git-push-github\scripts\push-github.ps1 -Check`
3. 运行提交推送：`powershell -ExecutionPolicy Bypass -File .trae\skills\git-push-github\scripts\push-github.ps1 -Message "本次改动说明"`

脚本会自动完成：init（若无）、设置远程名 `github` → `ssh://git@ssh.github.com:443/ninini929/niminghao.git`、`git add -A`、commit、push。推送被拒时自动 `pull --rebase` 重试一次；**禁止 force push**。

## 注意

- 远程名是 `github` 而不是 `origin`——本项目 `origin` 已被 Gitee 仓库占用，二者并存互不干扰。
- **必须走 `ssh.github.com:443`**：本机 hosts 文件把 github.com:22 屏蔽到 127.0.0.1 且无转发服务，直连会挂起；443 通道是 GitHub 官方支持的 SSH 备用入口（远程 URL 已写成 `ssh://git@ssh.github.com:443/...`）。
- SSH 使用非交互模式（`BatchMode=yes`），若公钥未加入 GitHub 账号会快速失败并提示，不会挂起。
- 无变更时脚本跳过 commit，仅确保远程配置存在。
