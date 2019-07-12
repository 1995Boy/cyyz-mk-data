package com.chuangyun.common.utils;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * @author Jerry Created by jerry on 6/12/17.
 */
public class ImportExcelUtil {
    /**
     * 2003- 版本的excel
     */
    private final static String EXCEL2003L = ".xls";
    /**
     * 2007+ 版本的excel
     */
    private final static String EXCEL2007U = ".xlsx";

    /**
     * 描述：获取IO流中的数据，组装成List<List<Object>>对象
     *
     * @param in,fileName
     * @return
     * @throws IOException
     */
    public List<List<Object>> getBankListByExcel(InputStream in, String fileName, int dataRow) throws Exception {
        List<List<Object>> list = null;

        // 创建Excel工作薄
        Workbook work = this.getWorkbook(in, fileName);
        if (null == work) {
            throw new Exception("创建Excel工作薄为空！");
        }
        Sheet sheet = null;
        Row row = null;
        Cell cell = null;

        list = new ArrayList<List<Object>>();
        // 遍历Excel中所有的sheet
        for (int i = 0; i < work.getNumberOfSheets(); i++) {
            sheet = work.getSheetAt(i);
            if (sheet == null) {
                continue;
            }

            // 遍历当前sheet中的所有行
            for (int j = dataRow; j <= sheet.getLastRowNum(); j++) {
                row = sheet.getRow(j);
                if (row == null || row.getFirstCellNum() == j) {
                    continue;
                }

                // 遍历所有的列
                List<Object> li = new ArrayList<Object>();

                if (row.getCell(1) == null) {
                    continue;
                }

                for (int y = row.getFirstCellNum(); y < row.getLastCellNum(); y++) {
                    if (isMergedRegion(sheet, j, y)) {
                        li.add(getMergedRegionValue(sheet, j, y));
                    } else {
                        cell = row.getCell(y);
                        li.add(this.getCellValue(cell));
                    }
                }
                list.add(li);
            }
        }
        work.close();
        return list;
    }

    /**
     * 判断是否是合并单元格
     *
     * @param sheet
     * @param row
     * @param column
     * @return
     */
    private boolean isMergedRegion(Sheet sheet, int row, int column) {
        int sheetMergeCount = sheet.getNumMergedRegions();
        for (int i = 0; i < sheetMergeCount; i++) {
            CellRangeAddress range = sheet.getMergedRegion(i);
            int firstColumn = range.getFirstColumn();
            int lastColumn = range.getLastColumn();
            int firstRow = range.getFirstRow();
            int lastRow = range.getLastRow();
            if (row >= firstRow && row <= lastRow) {
                if (column >= firstColumn && column <= lastColumn) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 读取合并单元格的值
     *
     * @param sheet
     * @param row
     * @param column
     * @return
     */
    private Object getMergedRegionValue(Sheet sheet, int row, int column) {
        int sheetMergeCount = sheet.getNumMergedRegions();

        for (int i = 0; i < sheetMergeCount; i++) {
            CellRangeAddress ca = sheet.getMergedRegion(i);
            int firstColumn = ca.getFirstColumn();
            int lastColumn = ca.getLastColumn();
            int firstRow = ca.getFirstRow();
            int lastRow = ca.getLastRow();

            if (row >= firstRow && row <= lastRow) {

                if (column >= firstColumn && column <= lastColumn) {
                    Row fRow = sheet.getRow(firstRow);
                    Cell fCell = fRow.getCell(firstColumn);
                    return getCellValue(fCell);
                }
            }
        }

        return null;
    }

    /**
     * 描述：根据文件后缀，自适应上传文件的版本
     *
     * @param inStr,fileName
     * @return
     * @throws Exception
     */
    public Workbook getWorkbook(InputStream inStr, String fileName) throws Exception {
        Workbook wb = null;
        String fileType = fileName.substring(fileName.lastIndexOf("."));
        if (EXCEL2003L.equals(fileType)) {
            // 2003-
            wb = new HSSFWorkbook(inStr);
        } else if (EXCEL2007U.equals(fileType)) {
            // 2007+
            wb = new XSSFWorkbook(inStr);
        } else {
            throw new Exception("解析的文件格式有误！");
        }
        return wb;
    }

    /**
     * 描述：对表格中数值进行格式化
     *
     * @param cell
     * @return
     */
    public Object getCellValue(Cell cell) {
        Object value = null;

        // 格式化number String字符
        DecimalFormat df = new DecimalFormat("0");

        // 日期格式化
        SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");

        // 格式化数字
        DecimalFormat df2 = new DecimalFormat("0.00");

        SimpleDateFormat df3 = new SimpleDateFormat("HH:mm");

        try {
            switch (cell.getCellTypeEnum()) {
                case STRING:
                    value = cell.getRichStringCellValue().getString();
                    break;
                case NUMERIC:
                    if ("General".equals(cell.getCellStyle().getDataFormatString())) {
                        value = df.format(cell.getNumericCellValue());
                    } else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
                        value = sdf.format(cell.getDateCellValue());
                    } else if ("h:mm".equals(cell.getCellStyle().getDataFormatString())) {
                        value = df3.format(cell.getDateCellValue());
                    } else {
                        value = df2.format(cell.getNumericCellValue());
                    }
                    break;
                case BOOLEAN:
                    value = cell.getBooleanCellValue();
                    break;
                case BLANK:
                    value = "";
                    break;
                default:
                    break;
            }
            return value;
        } catch (Exception e) {
            return "";
        }

    }
}
