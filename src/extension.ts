import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {

	const COMMAND = 'extension.splitLine'

	const createReg = (seq: string): RegExp => {
		return new RegExp(`(^\\s+|${seq}|\\s+$)`, 'g')
	}

	const commandHandler = async function (args: any) {
		let seq: string | undefined
		if (!args) {
			seq = await vscode.window.showInputBox({
				placeHolder: 'input separator for split'
			})
		} else {
			seq = args.separator
		}
		seq = seq || ','

		let editor = vscode.window.activeTextEditor
		if (!editor) { return }
		const document = editor.document
		const selection = editor.selection
		const word = document.getText(selection)
		if (!word.trim().length) { return }

		// space in first or last will be converted into line break
		const lines = word.replace(createReg(seq), (match: string): string => {
			if (match.trim().length) { return seq + '\n'}
			return '\n'
		})
		await editor.edit(builder => {
			builder.replace(selection, lines)
		})

		await vscode.commands.executeCommand(
			'editor.action.formatSelection', 
			document.uri,
			selection,
		)
		
	}
	let disposable = vscode.commands.registerCommand(COMMAND, commandHandler)
	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
