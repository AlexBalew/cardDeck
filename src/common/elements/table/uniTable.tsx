import React, {CSSProperties, ReactNode} from 'react';

export interface ITableModel {
    title: (index: number) => ReactNode;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

interface ITableProps {
// loading: boolean;
// error: string;
//
// logoutCallback: () => void;
    model: ITableModel[];
    data: any;
    headerStyle?: CSSProperties,
    tableStyle?: CSSProperties,
    rowsStyle?: CSSProperties,
    rowStyle?: CSSProperties,
}

export const UniTable: React.FC<ITableProps> = ({
// loading,
// error,
//
// logoutCallback,
                                                    model,
                                                    data,
                                                    headerStyle,
                                                    tableStyle,
                                                    rowsStyle,
                                                    rowStyle,
                                                }) => {
    return (
        <div
            style={{
                margin: '0 10px',
                minHeight: '80vh',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center', ...tableStyle,
            }}>
            table
            {/*  {loading
            ? <div style={{color: 'orange'}}>loading...</div>
            : error
            ? <div style={{color: 'red'}}>{error}</div>
            : <div><br/></div>
            }*/}

            <div
                style={{
                    border: '1px solid red',
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'center', ...headerStyle,
                }}>
                {model.map((m: ITableModel, index: number) => m.title(index))}
            </div>

            <div
                style={{border: '1px solid lime', width: '100%', ...rowsStyle,}}>
                {data.map((dataItem: any, dataIndex: number) => (
                    <div
                        key={dataItem._id || dataIndex}
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            justifyContent: 'center', ...rowStyle,
                        }}>
                        {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniTable;