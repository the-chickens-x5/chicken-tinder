function TableBody(props) {
	const rows = props.rows.map((row, index) => {
		return (
			<tr key={index}>
				<td style={{ textAlign: "center", fontSize: "24px" }}>{row}</td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>;
}

function Table(props) {
	return (
		<table>
			<TableBody rows={props.rows} />
		</table>
	);
}

export default Table;
