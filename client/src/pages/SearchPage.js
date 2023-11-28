import { useEffect, useState } from "react";
import {
    Container,
    Heading,
    Box,
    Grid,
    Text,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Flex,
    Button,
} from "@chakra-ui/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

const SearchPage = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [allAttributesForTable, setAllAttributesForTable] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [results, setResults] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axiosPrivate.get("/api/search/tables");
                setTables(response.data.data);
            } catch (error) {
                alert(error.message);
            }
        };
        fetchTables();
    }, []);

    useEffect(() => {
        const fetchAttributes = async (tableName) => {
            try {
                const response = await axiosPrivate.get(
                    "/api/search/tables/" + tableName + "/attributes"
                );
                setAllAttributesForTable(response.data.data);
            } catch (error) {
                alert(error.message);
            }
        };
        if (selectedTable !== "") {
            fetchAttributes(selectedTable);
        }
    }, [selectedTable]);

    const handleAttributeSearch = async () => {
        if (
            selectedTable &&
            Object.keys(selectedAttributes).some(
                (key) => selectedAttributes[key]
            )
        )
            try {
                const selected = Object.keys(selectedAttributes).filter(
                    (attribute) => selectedAttributes[attribute] === true
                );

                const response = await axiosPrivate.get(
                    "/api/search/tables/" + selectedTable,
                    {
                        params: selected,
                    }
                );
                setResults(response.data.data);
            } catch (error) {
                alert(error.message);
            }
    };

    const handleTableSelect = (event) => {
        setSelectedTable(event);
        setSelectedAttributes({});
        setAllAttributesForTable([]);
        setResults([]);
    };

    return (
        <Container
            boxShadow={"lg"}
            maxW="100%"
            height={"90vh"}
            backgroundColor={"white"}
        >
            <Box height={"100%"} p={4}>
                <Heading textAlign={"center"} mb={4}>
                    Projection
                </Heading>
                <Box mb={6}>
                    <Heading as="h2" fontSize={"xl"} mb={4}>
                        Tables
                    </Heading>
                    <RadioGroup
                        value={selectedTable}
                        onChange={handleTableSelect}
                        display={"flex"}
                        gap={6}
                        flexWrap={'wrap'}
                    >
                        {tables.map((table) => (
                            <Radio
                                key={table.table_name}
                                value={table.table_name}
                            >
                                {table.table_name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </Box>
                <Box mb={6}>
                    <Heading as="h2" fontSize={"xl"} mb={4}>
                        Attributes
                    </Heading>
                    <CheckboxGroup>
                        <Flex gap={6} flexWrap={'wrap'}>
                            {allAttributesForTable.map((attribute) => (
                                <Checkbox
                                    key={attribute.column_name}
                                    onChange={(e) =>
                                        setSelectedAttributes((prevState) => {
                                            const newState = {
                                                ...prevState,
                                            };
                                            newState[attribute.column_name] =
                                                e.target.checked;
                                            return newState;
                                        })
                                    }
                                >
                                    {attribute.column_name}
                                </Checkbox>
                            ))}
                            {Object.keys(selectedAttributes).some(
                                (key) => selectedAttributes[key]
                            ) ? (
                                <Button onClick={handleAttributeSearch}>
                                    Search
                                </Button>
                            ) : null}
                        </Flex>
                    </CheckboxGroup>
                </Box>
                <Box mb={6}>
                    <Heading as="h2" fontSize={"xl"} mb={4}>
                        Results
                    </Heading>
                    <TableContainer height={"30vh"} overflowY={"auto"}>
                        <Table variant={'striped'}>
                            <Thead>
                                <Tr>
                                    {results.length > 0 &&
                                        Object.keys(results[0]).map(
                                            (columnName) => (
                                                <Th key={columnName}>
                                                    {columnName}
                                                </Th>
                                            )
                                        )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {results.map((result, index) => (
                                    <Tr key={index}>
                                        {Object.values(result).map(
                                            (value) => (
                                                <Td key={value}>{value?.toString()}</Td>
                                            )
                                        )}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Container>
    );
};

export default SearchPage;
